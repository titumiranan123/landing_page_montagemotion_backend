import { db } from "../../db/db";
import { errorLogger, logger } from "../../logger/logger";
import { packageFeatureService } from "../pricing/package.service";

export const homeapiServices = {
  async advertsingService(type: string) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      const headerService = await client.query(
        `SELECT title, description, thumbnail, video_link FROM headers WHERE type = $1`,
        [type],
      );

      const worksService = await client.query(
        `SELECT thumbnail, video_link, sub_type FROM Works WHERE type = $1 AND is_visible = true ORDER BY position ASC`,
        [type],
      );

      const testimonialService = await client.query(
        `SELECT * FROM testimonials WHERE type = $1`,
        [type],
      );

      const pricingService = async () => {
        let res;
        if (type === "main") {
          res = await client.query(`SELECT * FROM packages `);
        } else {
          res = await client.query(`SELECT * FROM packages WHERE type = $1`, [
            type,
          ]);
        }
        logger.info("results", res.rows);
        const packages = res.rows;

        for (const pkg of packages) {
          pkg.features = await packageFeatureService.getFeaturesByPackageId(
            pkg.id,
          );
        }

        return packages;
      };

      const faqService = async () => {
        const result = await client.query(
          `SELECT id, title, sub_title FROM faqs WHERE type = $1 AND is_visible = true`,
          [type],
        );

        const faq = result.rows[0];
        if (!faq) return null;

        const faqitem = await client.query(
          `SELECT * FROM faq_items WHERE faq_id = $1 ORDER BY position ASC`,
          [faq.id],
        );

        faq.faqs = faqitem.rows;
        return faq;
      };

      const allFaqs = await faqService();
      const prices = await pricingService();

      await client.query("COMMIT");

      return {
        header: headerService.rows[0] || null,
        works: worksService.rows || [],
        testimonial: testimonialService.rows || [],
        faqs: allFaqs,
        pricing: prices || [],
      };
    } catch (error) {
      await client.query("ROLLBACK");
      errorLogger.error(error);
      throw error;
    } finally {
      client.release();
    }
  },

  async aboutService(role: string) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      const aboutService = await client.query(`SELECT * FROM about`);

      const member = role
        ? await client.query(
            `SELECT name, designation, photourl FROM members WHERE role = $1 ORDER BY position ASC`,
            [role],
          )
        : await client.query(`SELECT * FROM members ORDER BY position ASC`);

      await client.query("COMMIT");

      return {
        about: aboutService.rows[0] || null,
        member: member.rows || [],
      };
    } catch (error) {
      await client.query("ROLLBACK");
      errorLogger.error(error);
      throw error;
    } finally {
      client.release();
    }
  },

  async getAllHomeBlogs() {
    try {
      const result = await db.query(
        `SELECT title, short_description, description, image, slug, created_at FROM blogs ORDER BY position ASC`,
      );
      return result.rows || [];
    } catch (error) {
      errorLogger.error(error);
      return [];
    }
  },

  async getSingleBlogs(slug: string) {
    try {
      const result = await db.query(
        `SELECT title, short_description, description, image, slug, created_at FROM blogs WHERE slug = $1 ORDER BY position ASC`,
        [slug],
      );
      return result.rows[0] || null;
    } catch (error) {
      errorLogger.error(error);
      return null;
    }
  },
};
