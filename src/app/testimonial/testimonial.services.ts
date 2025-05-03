import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { ITestimonial } from "./testimonial.interface";

export const testimonialService = {
  async addTestimonial(data: ITestimonial) {
    try {
      const lastdata = await db.query(
        `SELECT * FROM testimonials ORDER BY position DESC LIMIT 1`,
      );
      const newPosition =
        lastdata.rows.length > 0 ? lastdata.rows[0].position + 1 : 1;

      const result = await db.query(
        `INSERT INTO testimonials (name,designation,message,image,video_message,position,type) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        [
          data.name,
          data.designation,
          data.message || "",
          data.image,
          data.video_message || "",
          newPosition,
          data.type,
        ],
      );
      return result.rows || null;
    } catch (error) {
      errorLogger.error(error);
    }
  },
  async getAllTestimonial() {
    // const cacheKey = "all_testimonial";
    // const cashData = await getCache(cacheKey);
    // if (cashData) return cashData;
    const result = await db.query(`SELECT * FROM testimonials`);
    // await setCache(cacheKey, result.rows);

    return result.rows;
  },
  async getTestimonialById(id: string) {
    const result = await db.query(`SELECT * FROM testimonials WHERE id = $1`, [
      id,
    ]);

    return result.rows;
  },
  async updateTestimonialPositions(testimonials: ITestimonial[]) {
    try {
      const client = await db.connect();
      try {
        await client.query("BEGIN");
        for (const testimonial of testimonials) {
          await client.query(
            `UPDATE testimonials SET position = $1 WHERE id = $2`,
            [testimonial.position, testimonial.id],
          );
        }
        await client.query("COMMIT");
        return testimonials;
      } catch (error) {
        await client.query("ROLLBACK");
        errorLogger.error(error);
      } finally {
        client.release();
      }
    } catch (error) {
      errorLogger.error(error);
    }
  },
  async deleteTestimonialById(id: string) {
    await db.query(`DELETE FROM testimonial WHERE id = $1`, [id]);
  },
};
