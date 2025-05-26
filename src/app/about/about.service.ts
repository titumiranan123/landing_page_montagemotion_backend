import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { IAbout } from "./about.interface";

export const aboutService = {
  async createOrUpdateAbout(data: IAbout) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");
      const {
        rows: [existing],
      } = await client.query(`SELECT id FROM about LIMIT 1`);
      let result;

      if (existing) {
        // Update existing row
        result = await client.query(
          `UPDATE about 
           SET title = $1, description = $2, image = $3, alt = $4, updated_at = NOW() 
           WHERE id = $5 
           RETURNING *`,
          [data.title, data.description, data.image, data.alt, existing.id],
        );
      } else {
        // Insert new row
        result = await client.query(
          `INSERT INTO about (title, description, image, alt) 
           VALUES ($1, $2, $3, $4) 
           RETURNING *`,
          [data.title, data.description, data.image, data.alt],
        );
      }

      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client
        .query("ROLLBACK")
        .catch((err) => errorLogger.error("Rollback failed", err));
      errorLogger.error("createOrUpdateAbout failed", error);
      throw new Error("Failed to process About data.");
    } finally {
      client.release();
    }
  },

  async getAllAbouts() {
    try {
      const result = await db.query(`SELECT * FROM about`);
      return result.rows;
    } catch (error) {
      errorLogger.error("getAllAbouts failed", error);
      throw new Error("Failed to fetch About data.");
    }
  },
};
