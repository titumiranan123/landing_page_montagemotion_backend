import { db } from "../../db/db";

export const homeapiServices = {
  async advertsingService(type: string) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      const headerService = await client.query(
        `SELECT title , description,thumbnail,video_link FROM headers WHERE type = $1 `,
        [type],
      );
      const worksService = await client.query(
        `SELECT thumbnail , video_link,sub_type FROM Works WHERE type = $1 AND is_visible = true ORDER BY position ASC`,
        [type],
      );
      const testimonialService = await client.query(
        `SELECT * FROM testimonials WHERE type = $1 `,
        [type],
      );
      const faqService = async () => {
        const result = await client.query(
          `SELECT id,title ,sub_title FROM faqs WHERE type = $1 AND is_visible = true `,
          [type],
        );
        const faq = result.rows[0];
        const faqitem = await client.query(
          `SELECT * FROM faq_items WHERE faq_id = $1 ORDER BY position ASC`,
          [faq.id],
        );
        faq.faqs = faqitem.rows;

        return faq;
      };
      const allFaqs = await faqService();
      return {
        header: headerService.rows[0],
        works: worksService.rows,
        testimonial: testimonialService.rows,
        faqs: allFaqs,
      };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
};
