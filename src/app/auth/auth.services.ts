/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../config";
import { db } from "../../db/db";
import { errorLogger, logger } from "../../logger/logger";
import ApiError from "../../utils/ApiError";
import { checkUser } from "../../utils/checkUser";
import { generateVerificationCode } from "../../utils/generateVerificationCode";
import { sendVerificationEmail } from "../../utils/sendVerificationEmail";
import { IUser, UserLoginHistory } from "./auth.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authService = {
  async createUser(data: IUser) {
    const client = await db.connect();
    await client.query("BEGIN");

    try {
      if (!data) {
        throw new ApiError(400, false, "Please check your data.");
      }

      const { name, email, password } = data;

      if (!name || !email || !password) {
        throw new ApiError(
          400,
          false,
          "Name, email, and password are required."
        );
      }

      // Check if user already exists
      const exists = await checkUser(email);
      if (exists) {
        errorLogger.error("User already exists");
        throw new ApiError(400, false, "User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = generateVerificationCode();
      const verificationTokenExpiresAt = new Date(
        Date.now() + 24 * 60 * 60 * 1000
      );

      const createUserQuery = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;

      const res = await client.query(createUserQuery, [
        name,
        email,
        hashedPassword,
      ]);
      const userId = res.rows[0].id;

      const createDynamicDataQuery = `
        INSERT INTO user_dynamic_data (
          user_id, verification_token, verification_token_expires_at, updated_at
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;

      await client.query(createDynamicDataQuery, [
        userId,
        verificationToken,
        verificationTokenExpiresAt,
        new Date(),
      ]);

      await client.query("COMMIT");

      const info = {
        name: name,
        email: email,
        code: verificationToken,
      };

      await sendVerificationEmail(info);

      return res.rows[0];
    } catch (error: any) {
      await client.query("ROLLBACK");
      errorLogger.error("Auth Error:", error);
      throw new ApiError(400, false, error.message || "User creation failed");
    } finally {
      client.release();
    }
  },

  async verifyToken(code: string) {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // Check if the verification token is valid
      const res = await client.query(
        `SELECT user_id FROM user_dynamic_data 
         WHERE verification_token = $1 
         AND verification_token_expires_at > NOW() 
         FOR UPDATE LIMIT 1`,
        [code]
      );

      if (res.rowCount === 0) {
        throw new ApiError(400, false, "Invalid or expired verification token");
      }

      const userId = res.rows[0].user_id;

      // Update the user status
      const updateUser = await client.query(
        `UPDATE users 
         SET verified = true, status = 'active' 
         WHERE id = $1 
         RETURNING id, name, email, verified, status`,
        [userId]
      );

      if (updateUser.rowCount === 0) {
        throw new ApiError(400, false, "User verification failed");
      }

      // Clear the verification token
      await client.query(
        `UPDATE user_dynamic_data 
         SET verification_token = NULL, verification_token_expires_at = NULL 
         WHERE user_id = $1`,
        [userId]
      );

      await client.query("COMMIT");
      return updateUser.rows[0];
    } catch (error: any) {
      await client.query("ROLLBACK");
      errorLogger.error("Verification Error:", error);
      throw error instanceof ApiError
        ? error
        : new ApiError(500, false, error.message || "Verification failed");
    } finally {
      client.release();
    }
  },

  async login(
    data: { email: string; password: string },
    logData: Partial<UserLoginHistory>
  ) {
    const client = await db.connect();
    let loginSuccessful = false;
    try {
      const result = await client.query(
        `SELECT * FROM users WHERE email = $1`,
        [data.email]
      );

      if (result.rowCount === 0) {
        throw new ApiError(404, false, "User not found");
      }

      const user = result.rows[0];

      // if (!user.verified) {
      //   throw new ApiError(403, false, "Please verify your email first");
      // }

      // if (user.status !== 'active') {
      //   throw new ApiError(403, false, "Your account is not active");
      // }

      const passwordMatch = await bcrypt.compare(data.password, user.password);
      if (!passwordMatch) {
        throw new ApiError(401, false, "Invalid credentials");
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        config.jwt_secret as string,
        { expiresIn: "24h" }
      );

      loginSuccessful = true;

      const logs = {
        user_id: user.id,
        device: logData.device,
        browser: logData.browser,
        ip_address: logData.ip_address,
        location: logData.location,
        is_successful: true,
        login_time: new Date(),
      };

      await this.logUserLogin(logs);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
        status: user.status,
        token,
      };
    } catch (error: any) {
      errorLogger.error("Login Error:", error);
      throw error instanceof ApiError
        ? error
        : new ApiError(500, false, error.message || "Login failed");
    } finally {
      // Log failed login attempt
      if (!loginSuccessful && data.email) {
        try {
          const failedLog = {
            user_id: data.email,
            device: logData.device,
            browser: logData.browser,
            ip_address: logData.ip_address,
            location: logData.location,
            is_successful: false,
            login_time: new Date(),
          };
          await this.logUserLogin(failedLog);
        } catch (logError) {
          errorLogger.error(
            "Failed to log unsuccessful login attempt:",
            logError
          );
        }
      }
      client.release();
    }
  },

  async allUsers() {
    try {
      const res = await db.query(
        "SELECT id, name, email, role, verified, status FROM users"
      );
      return res.rows;
    } catch (error: any) {
      errorLogger.error("Error fetching users:", error);
      throw new ApiError(500, false, "Failed to fetch users");
    }
  },

  async makeAdmin(id: string) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      const res = await client.query(
        `UPDATE users SET role = 'ADMIN' WHERE id = $1 RETURNING id, name, email, role`,
        [id]
      );

      if (res.rowCount === 0) {
        throw new ApiError(404, false, "User not found");
      }

      await client.query("COMMIT");
      return res.rows[0];
    } catch (error: any) {
      await client.query("ROLLBACK");
      errorLogger.error("Error making user admin:", error);
      throw new ApiError(
        400,
        false,
        error.message || "Failed to update user role"
      );
    } finally {
      client.release();
    }
  },

  async logUserLogin(data: Partial<UserLoginHistory>) {
    const query = `
      INSERT INTO user_login_history (
        user_id, device, browser, ip_address, login_time, location, is_successful
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    try {
      const res = await db.query(query, [
        data.user_id ?? null,
        data.device ?? null,
        data.browser ?? null,
        data.ip_address ?? null,
        data.login_time ?? new Date(),
        data.location ?? null,
        data.is_successful ?? false,
      ]);
      logger.info("Login history stored:", res.rows[0]);
      return res.rows[0];
    } catch (error) {
      errorLogger.error("Error storing login history:", error);
      throw new ApiError(500, false, "Failed to log login attempt");
    }
  },

  async deleteUser(id: string) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      // First delete dependent records
      await client.query(`DELETE FROM user_dynamic_data WHERE user_id = $1`, [
        id,
      ]);
      await client.query(`DELETE FROM user_login_history WHERE user_id = $1`, [
        id,
      ]);

      // Then delete the user
      const res = await client.query(
        `DELETE FROM users WHERE id = $1 RETURNING id`,
        [id]
      );

      if (res.rowCount === 0) {
        throw new ApiError(404, false, "User not found");
      }

      await client.query("COMMIT");
      return true;
    } catch (error: any) {
      await client.query("ROLLBACK");
      errorLogger.error("Error deleting user:", error);
      throw new ApiError(400, false, error.message || "Failed to delete user");
    } finally {
      client.release();
    }
  },
};

export const findUserByEmail = async (email: string) => {
  const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  return res.rows[0];
};

export const findUserById = async (id: string) => {
  const res = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return res.rows;
};
