/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { IService } from "./service.interface";

export const serviceService = {
  async createService(data: IService) {
    const positionResult = await db.query(
      `SELECT MAX(position) as max FROM services`,
    );
    const lastPosition = positionResult.rows[0]?.max || 0;
    const newPosition = lastPosition + 1;

    const result = await db.query(
      `INSERT INTO services (title, description, image, isPublish, href, position, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        data.title,
        data.description,
        data.image,
        data.isPublish,
        data.href,
        newPosition,
        data.is_active ?? true,
      ],
    );

    return result.rows[0];
  },

  async getAllServices() {
    const result = await db.query(
      `SELECT * FROM services ORDER BY position ASC`,
    );
    return result.rows;
  },

  async getServiceById(id: string) {
    const result = await db.query(`SELECT * FROM services WHERE id = $1`, [id]);
    return result.rows[0] || null;
  },

  async updateService(id: string, data: Partial<IService>) {
    const existing = await serviceService.getServiceById(id);
    if (!existing) throw new Error("Service not found");

    const updated = {
      ...existing,
      ...data,
    };

    const result = await db.query(
      `UPDATE services 
       SET title = $1,
           description = $2,
           image = $3,
           isPublish = $4,
           href = $5,
           position = $6,
           is_active = $7
       WHERE id = $8
       RETURNING *`,
      [
        updated.title,
        updated.description,
        updated.image,
        updated.isPublish,
        updated.href,
        updated.position,
        updated.is_active,
        id,
      ],
    );

    return result.rows[0];
  },

  async updateServicePositions(services: { id: string; position: number }[]) {
    const updates: Promise<any>[] = [];

    for (const service of services) {
      const existing = await db.query(
        `SELECT position FROM services WHERE id = $1`,
        [service.id],
      );
      const currentPosition = existing.rows[0]?.position;

      if (currentPosition !== service.position) {
        const updateQuery = db.query(
          `UPDATE services SET position = $1 WHERE id = $2`,
          [service.position, service.id],
        );
        updates.push(updateQuery);
      }
    }

    await Promise.all(updates);

    const result = await db.query(
      `SELECT * FROM services ORDER BY position ASC`,
    );
    return result.rows;
  },

  async deleteService(id: string) {
    const result = await db.query(
      `DELETE FROM services WHERE id = $1 RETURNING *`,
      [id],
    );
    return result.rows[0] || null;
  },
};
