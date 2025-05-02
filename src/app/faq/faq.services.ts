import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { IFaq } from "./faq.interfac";
import { faqItemService } from "./faqitem.service";

const checkFaqExists = async (id: string) => {
  const res = await db.query(`SELECT 1 FROM faqs WHERE id = $1`, [id]);
  if (res.rowCount === 0) throw new Error("FAQ not found");
};

export const faqService = {
  async createOrUpdateFaq(data: IFaq) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");
  
      // Check if FAQ with the same type exists
      const existingFaqResult = await client.query(
        `SELECT * FROM faqs WHERE type = $1`,
        [data.type]
      );
  
      let faqId: string
      let faqResult;
  
      if (existingFaqResult.rows.length > 0) {
        // Update existing FAQ
        faqId = existingFaqResult.rows[0].id;
        faqResult = await client.query(
          `UPDATE faqs SET title = $1, sub_title = $2, is_visible = $3 WHERE id = $4 RETURNING *`,
          [data.title, data.sub_title, data.is_visible, faqId]
        );
  
        // Delete old faq_items before adding new ones
        await client.query(`DELETE FROM faq_items WHERE faq_id = $1`, [faqId]);
      } else {
        // Insert new FAQ
        faqResult = await client.query(
          `INSERT INTO faqs (title, sub_title, is_visible, type) VALUES ($1, $2, $3, $4) RETURNING *`,
          [data.title, data.sub_title, data.is_visible, data.type]
        );
        faqId = faqResult.rows[0].id;
      }
  
      // Insert all faq_items again
      for (const item of data.faqs) {
        await faqItemService.createFaqItem(client, faqId, item);
      }
  
      await client.query("COMMIT");
      return faqResult.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      errorLogger.error(error);
      throw new Error("Failed to create or update FAQ");
    } finally {
      client.release();
    }
  }
,  

  async updateFaq(id: string, data: Partial<IFaq>) {
    await checkFaqExists(id);
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      await client.query(
        `UPDATE faqs 
         SET title = COALESCE($1, title), 
             sub_title = COALESCE($2, sub_title), 
             is_visible = COALESCE($3, is_visible), 
             type = COALESCE($4, type),
             updated_at = NOW()
         WHERE id = $5`,
        [data.title, data.sub_title, data.is_visible, data.type, id]
      );

      if (data.faqs && data.faqs.length > 0) {
        // First, delete old faq_items
        await client.query(`DELETE FROM faq_items WHERE faq_id = $1`, [id]);

        // Insert new faq_items
        for (const item of data.faqs) {
          await client.query(
            `INSERT INTO faq_items (faq_id, question, answer, is_visible, position) VALUES ($1, $2, $3, $4, $5)`,
            [id, item.question, item.answer, item.is_visible, item.position]
          );
        }
      }

      await client.query("COMMIT");
      return { message: "FAQ updated successfully" };
    } catch (error) {
      await client.query("ROLLBACK");
      errorLogger.error(error);
      throw new Error("Failed to update FAQ");
    } finally {
      client.release();
    }
  },

  async getFilteredFaqs(filter: { id?: string; type?: string }) {
    let query = `SELECT * FROM faqs`;
    const conditions: string[] = [];
    const values: any[] = [];

    if (filter.id) {
      values.push(filter.id);
      conditions.push(`id = $${values.length}`);
    }

    if (filter.type) {
      values.push(filter.type);
      conditions.push(`type = $${values.length}`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    const result = await db.query(query, values);

    for (const faq of result.rows) {
      faq.faqs = await faqItemService.getFaqItemsByFaqId(faq.id);
    }

    return result.rows || [];
  },

  async getFaqById(id: string) {
    const faqResult = await db.query(`SELECT * FROM faqs WHERE id = $1`, [id]);
    if (faqResult.rowCount === 0) return null;

    const faq = faqResult.rows[0];

    const itemsResult = await db.query(
      `SELECT * FROM faq_items WHERE faq_id = $1 ORDER BY position ASC`,
      [id]
    );
    faq.faqs = itemsResult.rows;

    return faq;
  },

  async getFaqByType(type: string) {
    const faqResult = await db.query(`SELECT * FROM faqs WHERE type = $1`, [
      type,
    ]);
    const faqs = faqResult.rows;

    for (const faq of faqs) {
      const itemsResult = await db.query(
        `SELECT * FROM faq_items WHERE faq_id = $1 ORDER BY position ASC`,
        [faq.id]
      );
      faq.faqs = itemsResult.rows;
    }

    return faqs;
  },

  async deleteFaq(id: string) {
    await checkFaqExists(id);
    const result = await db.query(
      `DELETE FROM faqs WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  },
};
