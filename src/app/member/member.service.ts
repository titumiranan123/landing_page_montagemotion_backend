/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { MemberProfile } from "./member.interface";

export const MemberService = {
  async createMember(data: MemberProfile) {
    const positionResult = await db.query(
      `SELECT MAX(position) as max FROM members`,
    );
    const lastPosition = positionResult.rows[0]?.max || 0;
    const newPosition = lastPosition + 1;

    const result = await db.query(
      `INSERT INTO members (
        name, role, designation, photourl, email, phone, bio, position
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8
      ) RETURNING *`,
      [
        data.name,
        data.role,
        data.designation,
        data.photourl,
        data.email,
        data.phone,
        data.bio,
        newPosition,
      ],
    );
    return result.rows[0];
  },

  async getAllMembers(role?: "team_member" | "influencer") {
    const result = role
      ? await db.query(
          `SELECT * FROM members WHERE role = $1 ORDER BY position ASC`,
          [role],
        )
      : await db.query(`SELECT * FROM members ORDER BY position ASC`);
    return result.rows;
  },

  async getMembersById(id: string) {
    const result = await db.query(`SELECT * FROM members WHERE id = $1`, [id]);
    return result.rows?.[0] || null;
  },

  async updateMember(id: string, data: Partial<MemberProfile>) {
    const existing = await MemberService.getMembersById(id);
    if (!existing) throw new Error("Member not found");

    const updated = {
      ...existing,
      ...data,
    };

    const result = await db.query(
      `UPDATE members SET
        name = $1,
        role = $2,
        designation = $3,
        photourl = $4,
        email = $5,
        phone = $6,
        bio = $7,
        updated_at = NOW()
      WHERE id = $8
      RETURNING *`,
      [
        updated.name,
        updated.role,
        updated.designation,
        updated.photourl,
        updated.email,
        updated.phone,
        updated.bio,
        id,
      ],
    );
    return result.rows[0];
  },

  async deleteMember(id: string) {
    const result = await db.query(
      `DELETE FROM members WHERE id = $1 RETURNING *`,
      [id],
    );
    return result.rows[0] || null;
  },

  async updateMemberPosition(members: { id: string; position: number }[]) {
    const updates: Promise<any>[] = [];

    for (const mem of members) {
      const existing = await db.query(
        `SELECT position FROM members WHERE id = $1`,
        [mem.id],
      );
      const currentPosition = existing.rows[0]?.position;

      if (currentPosition !== mem.position) {
        const updateQuery = db.query(
          `UPDATE members SET position = $1 WHERE id = $2`,
          [mem.position, mem.id],
        );
        updates.push(updateQuery);
      }
    }

    await Promise.all(updates);
  },
};
