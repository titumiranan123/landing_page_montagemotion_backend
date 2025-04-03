import { db } from "../../db/db";
import { logger } from "../../logger/logger";
import { IFaq } from "./faq.interfac";

export const faqService = {
  async createFaq(data: IFaq) {
    try {
      const res = await db.query(
        `INSERT INTO faq (question,answer,isVisible,type) VALUE($1, $2, $3, $4)`,
        [data.question, data.answer, data.isVisible, data.type]
      );
      return res.rows || null;
    } catch (error) {
      logger.error(error);
    }
  },
  async getAllService() {
    try {
      const res = await db.query(`SELECT * FROM faq `);
      return res.rows;
    } catch (error) {
      logger.error(error);
    }
  },
  async getServiceById(id: string) {
    try {
      const res = await db.query(`SELECT * FROM faq WHERE id = $1`, [id]);
      return res.rows;
    } catch (error) {
      logger.error(error);
    }
  },
  async updateServiceById(data: IFaq, id: string) {
    try {
      const keys = Object.keys(data);
      if (keys.length === 0) {
        throw new Error("No fields provided for update.");
      }
      const setClasuse = keys
        .map((key: string, index: number) => {
          return `${key} = $${index + 1}`;
        })
        .join(",");

      const res = await db.query(
        `UPDATE faq SET ${setClasuse}  WHERE id =  $${
          keys.length + 1
        } RETURNING *`,
        [...keys.map((key: string) => (data as any)[key], id)]
      );
      return res.rows || null;
    } catch (error) {
      logger.error(error);
    }
  },
  async deleteServiceById(id: string) {
    try {
      const res = await db.query(`DELETE  FROM faq WHERE id = $1`, [id]);
      return res.rowCount;
    } catch (error) {
      logger.error(error);
    }
  },
};
