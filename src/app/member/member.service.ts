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
        name, role, designation, username, photourl, bio, location, email, phone,
        niche, followers, platforms, collaborationtype, engagementrate, portfoliolinks,
        skills, sociallinks, position
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10, $11, $12, $13, $14, $15,
        $16, $17, $18
      ) RETURNING *`,
      [
        data.name,
        data.role,
        data.designation,
        data.username,
        data.photourl,
        data.bio,
        data.location,
        data.email,
        data.phone,
        data.niche,
        data.followers,
        JSON.stringify(data.platforms || []),
        JSON.stringify(data.collaborationtype || []),
        data.engagementrate,
        JSON.stringify(data.portfoliolinks || []),
        JSON.stringify(data.skills || []),
        JSON.stringify(data.sociallinks || {}),
        newPosition,
      ],
    );
    return result.rows[0];
  },

  async getAllMembers(role?: "Team Member" | "Influencer") {
    const result = role
      ? await db.query(
          `SELECT * FROM members WHERE role = $1 ORDER BY position ASC`,
          [role],
        )
      : await db.query(`SELECT * FROM members ORDER BY position ASC`);
    return result.rows;
  },
  async getMembersById(id: string) {
    const result = await db.query(
      `SELECT * FROM members WHERE id = $1 ORDER BY position ASC`,
      [id],
    );
    return result.rows || null;
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
        username = $4,
        photoUrl = $5,
        bio = $6,
        location = $7,
        email = $8,
        phone = $9,
        niche = $10,
        followers = $11,
        platforms = $12,
        collaborationType = $13,
        engagementRate = $14,
        portfolioLinks = $15,
        skills = $16,
        socialLinks = $17
       WHERE id = $18
       RETURNING *`,
      [
        updated.name,
        updated.role,
        updated.designation,
        updated.username,
        updated.photourl,
        updated.bio,
        updated.location,
        updated.email,
        updated.phone,
        updated.niche,
        updated.followers,
        JSON.stringify(updated.platforms || []),
        JSON.stringify(updated.collaborationtype || []),
        updated.engagementrate,
        JSON.stringify(updated.portfoliolinks || []),
        JSON.stringify(updated.skills || []),
        JSON.stringify(updated.sociallinks || {}),
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
