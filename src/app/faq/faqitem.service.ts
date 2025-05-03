/* eslint-disable @typescript-eslint/no-explicit-any */
import { PoolClient } from "pg";
import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";

export const faqItemService = {
  async createFaqItem(
    client: PoolClient,
    faqId: string,
    item: { question: string; answer: string; is_visible: boolean },
  ) {
    try {
      const positionResult = await client.query(
        `SELECT MAX(position) as max FROM faq_items WHERE faq_id = $1`,
        [faqId],
      );
      const lastPosition = positionResult.rows[0].max || 0;
      const newPosition = lastPosition + 1;

      const result = await client.query(
        `INSERT INTO faq_items (faq_id, question, answer, is_visible, position) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [faqId, item.question, item.answer, item.is_visible, newPosition],
      );

      return result.rows[0];
    } catch (error) {
      errorLogger.error(error);
      throw new Error("Failed to create FAQ item");
    }
  },
  async createFaqItems(
    faqId: string,
    item: { question: string; answer: string; is_visible: boolean },
  ) {
    try {
      const positionResult = await db.query(
        `SELECT MAX(position) as max FROM faq_items WHERE faq_id = $1`,
        [faqId],
      );
      const lastPosition = positionResult.rows[0].max || 0;
      const newPosition = lastPosition + 1;

      const result = await db.query(
        `INSERT INTO faq_items (faq_id, question, answer, is_visible, position) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [faqId, item.question, item.answer, item.is_visible, newPosition],
      );

      return result.rows[0];
    } catch (error) {
      errorLogger.error(error);
      throw new Error("Failed to create FAQ item");
    }
  },
  async updateFaqItem(
    id: string,
    item: {
      question?: string;
      answer?: string;
      is_visible?: boolean;
      position?: number;
    },
  ) {
    try {
      const fields: string[] = [];
      const values: any[] = [];
      let idx = 1;

      if (item.question !== undefined) {
        fields.push(`question = $${idx++}`);
        values.push(item.question);
      }
      if (item.answer !== undefined) {
        fields.push(`answer = $${idx++}`);
        values.push(item.answer);
      }
      if (item.is_visible !== undefined) {
        fields.push(`is_visible = $${idx++}`);
        values.push(item.is_visible);
      }
      if (item.position !== undefined) {
        fields.push(`position = $${idx++}`);
        values.push(item.position);
      }
      if (fields.length === 0) throw new Error("Nothing to update");
      values.push(id);
      const query = `UPDATE faq_items SET ${fields.join(
        ", ",
      )}, updated_at = NOW() WHERE id = $${idx} RETURNING *`;
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      errorLogger.error(error);
      throw new Error("Failed to update FAQ item");
    }
  },

  async deleteFaqItem(id: string) {
    try {
      const result = await db.query(
        `DELETE FROM faq_items WHERE id = $1 RETURNING *`,
        [id],
      );
      return result.rows[0];
    } catch (error) {
      errorLogger.error(error);
      throw new Error("Failed to delete FAQ item");
    }
  },

  async getFaqItemsByFaqId(faqId: string) {
    try {
      const result = await db.query(
        `SELECT * FROM faq_items WHERE faq_id = $1 ORDER BY position ASC`,
        [faqId],
      );
      return result.rows;
    } catch (error) {
      errorLogger.error(error);
      throw new Error("Failed to fetch FAQ items");
    }
  },
  async updateFaqItemPositions(items: { id: string; position: number }[]) {
    const updates: Promise<any>[] = [];
    for (const item of items) {
      const existing = await db.query(
        `SELECT position FROM faq_items WHERE id = $1`,
        [item.id],
      );
      const currentPosition = existing.rows[0]?.position;
      if (currentPosition !== item.position) {
        const updateQuery = db.query(
          `UPDATE faq_items SET position = $1 WHERE id = $2`,
          [item.position, item.id],
        );

        updates.push(updateQuery);
      }
    }

    await Promise.all(updates);

    return;
  },
};
