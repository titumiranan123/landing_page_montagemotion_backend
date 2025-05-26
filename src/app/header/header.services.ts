/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { IHeader } from "./header.interface";

export const headerService = {
  async addOrUpdateHeader(data: IHeader) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      // First check if a header of this type already exists
      const existingHeader = await client.query(
        `SELECT id FROM headers WHERE type = $1 LIMIT 1`,
        [data.type],
      );

      if (existingHeader.rows.length > 0) {
        // Update existing header of this type
        const result = await client.query(
          `UPDATE headers 
           SET title = $1, description = $2,book_link=$3, thumbnail = $4, alt = $5,
               video_link = $6,  updated_at = NOW()
           WHERE type = $7 
           RETURNING *`,
          [
            data.title,
            data.description,
            data.book_link,
            data.thumbnail,
            data.alt,
            data.video_link,
            data.type,
          ],
        );
        await client.query("COMMIT");
        return result.rows[0] || null;
      } else {
        // Insert new header
        const result = await client.query(
          `INSERT INTO headers 
           (title, description,book_link, thumbnail, alt, video_link, type,created_at) 
           VALUES ($1, $2, $3, $4, $5, $6,$7, NOW()) 
           RETURNING *`,
          [
            data.title,
            data.description,
            data.book_link,
            data.thumbnail,
            data.alt,
            data.video_link,
            data.type,
          ],
        );
        await client.query("COMMIT");
        return result.rows[0] || null;
      }
    } catch (error) {
      if (client) {
        await client.query("ROLLBACK");
      }
      errorLogger.error(error);
      throw new Error("Failed to process header video.");
    } finally {
      if (client) {
        client.release();
      }
    }
  },

  async getAllHeaders(type: string) {
    let query = `SELECT * FROM headers`;
    const values: any[] = [];
    if (type) {
      query += `  WHERE type = $1`;
      values.push(type);
    }
    query += ` ORDER BY created_at DESC`;
    const result = await db.query(query, values);
    return result.rows;
  },
};
