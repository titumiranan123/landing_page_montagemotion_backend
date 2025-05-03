import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { IAbout } from "./about.interface";

export const aboutService = {
  async createOrUpdateAbout(data: IAbout) {
    let client;

    try {
      client = await db.connect();
      await client.query("BEGIN");

      // Check if an about entry already exists
      const { rows: existingRows } = await client.query(
        `SELECT * FROM about LIMIT 1`,
      );

      if (existingRows.length > 0) {
        // Update existing row
        const result = await client.query(
          `UPDATE about 
           SET title = $1, description = $2, image = $3,  updated_at = NOW() 
           WHERE id = $4 
           RETURNING *`,
          [data.title, data.description, data.image, existingRows[0].id],
        );

        await client.query("COMMIT");
        return result.rows[0];
      } else {
        // Insert new row
        const result = await client.query(
          `INSERT INTO about (title, description, image)
           VALUES ($1, $2, $3)
           RETURNING *`,
          [data.title, data.description, data.image],
        );

        await client.query("COMMIT");
        return result.rows[0];
      }
    } catch (error) {
      if (client) {
        await client.query("ROLLBACK");
      }
      errorLogger.error(error);
      throw new Error("Failed to process About data.");
    } finally {
      if (client) {
        client.release();
      }
    }
  },

  async getAllAbouts() {
    const result = await db.query(`SELECT * FROM about`);
    return result.rows[0];
  },

  async getAboutById(id: string) {
    const result = await db.query(`SELECT * FROM about WHERE id = $1`, [id]);
    return result.rows[0] || null;
  },

  async updateAbout(id: string, data: Partial<IAbout>) {
    const existing = await aboutService.getAboutById(id);
    if (!existing) throw new Error("About not found");

    const updated = {
      ...existing,
      ...data,
    };

    const result = await db.query(
      `UPDATE about 
       SET title = $1, description = $2, image = $3, updatedAt = NOW()
       WHERE id = $4 
       RETURNING *`,
      [updated.title, updated.description, updated.image, id],
    );

    return result.rows[0];
  },

  async deleteAbout(id: string) {
    const result = await db.query(
      `DELETE FROM about WHERE id = $1 RETURNING *`,
      [id],
    );
    return result.rows[0] || null;
  },
};
