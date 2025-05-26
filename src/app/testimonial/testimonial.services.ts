import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { ITestimonial } from "./testimonial.interface";

export const testimonialService = {
  async addTestimonial(data: ITestimonial) {
    try {
      const { rows } = await db.query(
        `SELECT position FROM testimonials ORDER BY position DESC LIMIT 1`,
      );

      const newPosition = rows.length > 0 ? rows[0].position + 1 : 1;

      const result = await db.query(
        `INSERT INTO testimonials 
         (name, designation, message, image, video_message, position, category, type)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [
          data.name,
          data.designation,
          data.message ?? null,
          data.image,
          data.video_message ?? null,
          newPosition,
          data.category,
          data.type,
        ],
      );

      return result.rows[0];
    } catch (error) {
      errorLogger.error(error);
      throw new Error("Error creating testimonial");
    }
  },

  async getAllTestimonial() {
    const result = await db.query(
      `SELECT * FROM testimonials ORDER BY position ASC`,
    );
    return result.rows;
  },

  async getTestimonialById(id: string) {
    const result = await db.query(`SELECT * FROM testimonials WHERE id = $1`, [
      id,
    ]);
    return result.rows[0];
  },

  async updateTestimonialPositions(testimonials: ITestimonial[]) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      for (const { id, position } of testimonials) {
        if (!id || position === undefined) continue;
        await client.query(
          `UPDATE testimonials SET position = $1 WHERE id = $2`,
          [position, id],
        );
      }

      await client.query("COMMIT");
      return testimonials;
    } catch (error) {
      await client.query("ROLLBACK");
      errorLogger.error(error);
      throw new Error("Failed to update testimonial positions");
    } finally {
      client.release();
    }
  },

  async updateTestimonial(id: string, data: Partial<ITestimonial>) {
    try {
      const result = await db.query(
        `UPDATE testimonials
         SET 
           name = $1,
           designation = $2,
           message = $3,
           image = $4,
           video_message = $5,
           category = $6,
           type = $7,
           position = $8,
           updated_at = NOW()
         WHERE id = $9
         RETURNING *`,
        [
          data.name,
          data.designation,
          data.message ?? null,
          data.image,
          data.video_message ?? null,
          data.category,
          data.type,
          data.position ?? 1,
          id,
        ],
      );

      return result.rows[0];
    } catch (error) {
      errorLogger.error(error);
      throw new Error("Error updating testimonial");
    }
  },

  async deleteTestimonialById(id: string) {
    try {
      await db.query(`DELETE FROM testimonials WHERE id = $1`, [id]);
      return { message: "Testimonial deleted" };
    } catch (error) {
      errorLogger.error(error);
      throw new Error("Error deleting testimonial");
    }
  },
};
