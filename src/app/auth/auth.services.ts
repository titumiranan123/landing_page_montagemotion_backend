/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { errorLogger, logger } from "../../logger/logger";
import ApiError from "../../utils/ApiError";
import { checkUser } from "../../utils/checkUser";
import { generateVerificationCode } from "../../utils/generateVerificationCode";
import { sendVerificationEmail } from "../../utils/sendVerificationEmail";
import { IUser, UserLoginHistory } from "./auth.interface";
import bcrypt from "bcryptjs";

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
          "Name, email, and password are required.",
        );
      }

      // Check if user already exists
      const exists = await checkUser(email);
      if (exists) {
        errorLogger.error("User already exists");
        throw new ApiError(400, false, "User already exists"); // This will now be an ApiError
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const verificationToken = generateVerificationCode();
      const verificationTokenExpiresAt = new Date(
        Date.now() + 24 * 60 * 60 * 1000,
      );

      const createUserQuery = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

      const res = await client.query(createUserQuery, [
        data.name,
        data.email,
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
        name: data.name,
        email: data.email,
        code: verificationToken,
      };

      await sendVerificationEmail(info);

      return res.rows || null;
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

      // Step 1: Check if the user exists and token is valid
      const res = await client.query(
        `SELECT user_id FROM user_dynamic_data WHERE verification_token = $1 AND verification_token_expires_at > NOW() FOR UPDATE LIMIT 1`,
        [code],
      );

      if (res.rowCount === 0) {
        await client.query("ROLLBACK");
        return null;
      }
      const userId = res.rows[0].user_id;
      // Step 2: Update the user status
      const updateUser = await client.query(
        `UPDATE users 
       SET verified = $1, status = $2 
       WHERE id = $3 
       RETURNING id, name, email, verified, status`,
        [true, "active", userId],
      );
      if (updateUser.rowCount === 0) {
        await client.query("ROLLBACK");
        return null;
      }
      await client.query("COMMIT");
      return updateUser.rows;
    } catch (error: any) {
      await client.query("ROLLBACK");
      new Error(error.message);
    } finally {
      client.release();
    }
  },
  async allUsers() {
    const res = await db.query("SELECT * FROM users ");
    return res.rows;
  },
  async makeAdmin(id: string) {
    try {
      const res = await db.query(
        `UPDATE  users SET role = $1 WHERE id = $2 RETURNING *`,
        ["ADMIN", id],
      );
      return Boolean(res.rowCount);
    } catch (error: any) {
      throw new ApiError(400, false, error.message);
    }
  },
  async logUserLogin(data: UserLoginHistory) {
    const query = `
    INSERT INTO user_login_history (user_id, device, browser, ip_address, login_time, location, is_successful)
    VALUES ($1, $2, $3, $4, NOW(), $5, $6)
    RETURNING *;
  `;

    try {
      const res = await db.query(query, [
        data.user_id || "",
        data.device || "",
        data.browser || "",
        data.ip_address || "",
        data.location || "",
        data.is_successful || true,
      ]);
      logger.info("Login history stored:", res.rows[0]);
      return res.rows[0];
    } catch (error) {
      errorLogger.error("Error storing login history:", error);
    }
  },
  async deleteUser(id: string) {
    try {
      const res = await db.query(
        `DELETE FROM users WHERE id = $1 RETURNING *`,
        [id],
      );
      return Boolean(res.rowCount);
    } catch (error: any) {
      throw new ApiError(400, false, error.message);
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
