import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { IFaq } from "./faq.interfac";


const checkFaqExists = async (id: string) => {
  const res = await db.query(`SELECT 1 FROM faqs WHERE id = $1`, [id]);
  if (res.rowCount === 0) throw new Error("FAQ not found");
};

export const faqService = {
  async createFaq(data: IFaq) {
    try {
      const result = await db.query(
        `INSERT INTO faqs (faqs, type) VALUES ($1, $2) RETURNING *`,
        [JSON.stringify(data.faqs), data.type]
      );
      return result.rows[0];
    } catch (error) {
      errorLogger.error(error);
      throw new Error("Failed to create FAQ");
    }
  },

  async updateFaq(id: string, data: Partial<IFaq>) {
    await checkFaqExists(id);
    const result = await db.query(
      `UPDATE faqs SET faqs = $1, type = $2 WHERE id = $3 RETURNING *`,
      [JSON.stringify(data.faqs), data.type, id]
    );
    return result.rows[0];
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
    return result.rows || [];
  }
,  

  async getFaqById(id: string) {
    const result = await db.query(`SELECT * FROM faqs WHERE id = $1`, [id]);
    return result.rows || null;
  },

  async getFaqByType(type: string) {
    const result = await db.query(`SELECT * FROM faqs WHERE type = $1`, [type]);
    return result.rows;
  },

  async deleteFaq(id: string) {
    await checkFaqExists(id);
    const result = await db.query(`DELETE FROM faqs WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
  },
};
