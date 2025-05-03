/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { IState } from "./state.interface";

export const stateService = {
  async createState(data: IState) {
    const result = await db.query(
      `INSERT INTO states (isActive, states, type)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [data.isActive, JSON.stringify(data.states), data.type],
    );
    return result.rows[0];
  },

  async getAllStates(query?: { id?: string; type?: string }) {
    const filters: string[] = [];
    const values: any[] = [];

    if (query?.id) {
      values.push(query.id);
      filters.push(`id = $${values.length}`);
    }

    if (query?.type) {
      values.push(query.type);
      filters.push(`type = $${values.length}`);
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
    const result = await db.query(
      `SELECT * FROM states ${whereClause}`,
      values,
    );
    return result.rows;
  },

  async getStateById(id: string) {
    const result = await db.query(`SELECT * FROM states WHERE id = $1`, [id]);
    return result.rows[0];
  },

  async updateState(id: string, data: Partial<IState>) {
    const old = await stateService.getStateById(id);
    if (!old) throw new Error("State not found");

    const merged = {
      ...old,
      ...data,
      states: data.states ? JSON.stringify(data.states) : old.states,
    };

    const result = await db.query(
      `UPDATE states
       SET isActive = $1, states = $2, type = $3
       WHERE id = $4 RETURNING *`,
      [merged.isActive, merged.states, merged.type, id],
    );

    return result.rows[0];
  },

  async deleteState(id: string) {
    const result = await db.query(
      `DELETE FROM states WHERE id = $1 RETURNING *`,
      [id],
    );
    return result.rows[0];
  },
};
