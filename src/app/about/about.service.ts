import { db } from "../../db/db";
import { IAbout } from "./about.interface";


export const aboutService = {
  async createAbout(data: IAbout) {
    const result = await db.query(
      `INSERT INTO about (title, description, image, isPublish)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [data.title, data.description, data.image, data.isPublish]
    );
    return result.rows;
  },

  async getAllAbouts() {
    const result = await db.query(`SELECT * FROM about`);
    return result.rows;
  },

  async getAboutById(id: string ) {
    const result = await db.query(`SELECT * FROM about WHERE id = $1`, [id]);
    return result.rows[0] || null;
  },

  async updateAbout(id: string , data: Partial<IAbout>) {
    const existing = await aboutService.getAboutById(id);
    if (!existing) throw new Error("about not found");

    const updated = {
      ...existing,
      ...data,
    };

    const result = await db.query(
      `UPDATE about 
       SET title = $1, description = $2, image = $3, isPublish = $4 
       WHERE id = $5 
       RETURNING *`,
      [updated.title, updated.description, updated.image, updated.isPublish, id]
    );

    return result.rows[0];
  },

  async deleteAbout(id: string ) {
    const result = await db.query(`DELETE FROM about WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0] || null;
  },
};
