/* eslint-disable @typescript-eslint/no-explicit-any */

import { db } from "../../db/db";
import ApiError from "../../utils/ApiError";
import { getCache, setCache } from "../../utils/cache";
import { IContact } from "./contact.interface";
import { sendEmailToAdmin } from "./utils";


export const contactService = {
  async createContact(data: IContact) {
    if (!data) {
      throw new ApiError(400, false, "Please check your data.");
    }
    try {
      const query = `INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *`;
      const values = [data.name, data.email, data.message];
      const res = await db.query(query, values);
      await sendEmailToAdmin(data);
      return res.rows;
    } catch (error: any) {
      throw new ApiError(400, false, error.message);
    }
  },
  async getAllContact() {
    const cacheKey = "contacts";
    const cashData = await getCache(cacheKey);
    if (cashData?.length > 0) return cashData;
    const res = await db.query(`SELECT * FROM contacts ORDER BY created_at DESC;`);
    await setCache(cacheKey, res.rows);
    return res.rows || null;
  },

  async deleteContactById(id: string) {
    const isExist = await db.query(
      `SELECT 1 FROM contacts WHERE id = $1 Limit 1;`,
      [id],
    );
    if (isExist.rowCount === 0) {
      throw new ApiError(400, false, "Contact not found !");
    }
    const res = await db.query(`DELETE FROM contacts WHERE id = $1;`, [id]);
    return res.rows || null;
  },
};
