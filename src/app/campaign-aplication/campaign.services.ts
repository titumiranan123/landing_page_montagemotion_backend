import { db } from "../../db/db";
import nodemailer from "nodemailer";
import { ICampaign } from "./campaign.interfacet";
export const CampaignService = {
  async create(data: ICampaign) {
    const result = await db.query(
      `INSERT INTO campaigns (email, phone, ovc, message, selectedinfuencers, budget, project_brief)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [
        data.email,
        data.phone,
        data.ovc,
        data.message,
        JSON.stringify(data.selectedinfuencers),
        data.budget,
        data.project_brief,
      ],
    );
    return result.rows[0];
  },

  async getAll() {
    const result = await db.query(
      `SELECT * FROM campaigns ORDER BY created_at DESC`,
    );
    return result.rows;
  },

  async getById(id: string) {
    const result = await db.query(`SELECT * FROM campaigns WHERE id = $1`, [
      id,
    ]);
    return result.rows[0] || null;
  },

  async update(id: string, data: Partial<ICampaign>) {
    const existing = await CampaignService.getById(id);
    if (!existing) throw new Error("Campaign not found");

    const updated = {
      ...existing,
      ...data,
    };

    const result = await db.query(
      `UPDATE campaigns SET
         email = $1,
         phone = $2,
         ovc = $3,
         message = $4,
         selectedinfuencers = $5,
         budget = $6,
         project_brief = $7,
         is_read = $8,
         is_marked = $9,
         is_rejected = $10
       WHERE id = $11
       RETURNING *`,
      [
        updated.email,
        updated.phone,
        updated.ovc,
        updated.message,
        JSON.stringify(updated.selectedInfuencers),
        updated.budget,
        updated.project_brief,
        updated.is_read,
        updated.is_marked,
        updated.is_rejected,
        id,
      ],
    );

    return result.rows[0];
  },

  async delete(id: string) {
    const result = await db.query(
      `DELETE FROM campaigns WHERE id = $1 RETURNING *`,
      [id],
    );
    return result.rows[0];
  },

  async updateStatus(
    id: string,
    type: "is_read" | "is_marked" | "is_rejected",
    value: boolean | string,
  ) {
    const result = await db.query(
      `UPDATE campaigns SET ${type} = $1 WHERE id = $2 RETURNING *`,
      [value, id],
    );

    if (type === "is_rejected" && value === true) {
      const campaign = await CampaignService.getById(id);
      if (campaign?.email) {
        await CampaignService.sendRejectionEmail(campaign.email);
      }
    }
    return result.rows[0];
  },

  async sendRejectionEmail(email: string) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "titumiranan.gtc@gmail.com",
        pass: "lmke ziod tysh bcgo",
      },
    });

    await transporter.sendMail({
      from: '"Campaign Team"',
      to: email,
      subject: "Your Campaign was Rejected",
      text: "Sorry, your campaign was rejected. Please reach out for more info.",
    });
  },
};
