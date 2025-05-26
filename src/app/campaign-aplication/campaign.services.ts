import { db } from "../../db/db";
import nodemailer from "nodemailer";
import { ICampaign } from "./campaign.interface";

export const CampaignService = {
  async create(data: ICampaign) {
    const result = await db.query(
      `INSERT INTO campaigns 
        (name, email, phone, ovc, message, selectedinfuencers, budget, project_brief, is_read, is_marked, is_rejected, is_sent, rejected_message)
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [
        data.name,
        data.email,
        data.phone,
        data.ovc,
        data.message,
        data.selectedinfuencers,
        data.budget,
        data.project_brief,
        data.is_read ?? false,
        data.is_marked ?? false,
        data.is_rejected ?? false,
        data.is_sent ?? false,
        data.rejected_message ?? "",
      ],
    );
    return result.rows[0] || null;
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
         name = $1,
         email = $2,
         phone = $3,
         ovc = $4,
         message = $5,
         selectedinfuencers = $6,
         budget = $7,
         project_brief = $8,
         is_read = $9,
         is_marked = $10,
         is_rejected = $11,
         is_sent = $12,
         rejected_message = $13,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $14
       RETURNING *`,
      [
        updated.name,
        updated.email,
        updated.phone,
        updated.ovc,
        updated.message,
        updated.selectedinfuencers,
        updated.budget,
        updated.project_brief,
        updated.is_read ?? false,
        updated.is_marked ?? false,
        updated.is_rejected ?? false,
        updated.is_sent ?? false,
        updated.rejected_message ?? "",
        id,
      ],
    );

    return result.rows[0] || null;
  },

  async delete(id: string) {
    const result = await db.query(
      `DELETE FROM campaigns WHERE id = $1 RETURNING *`,
      [id],
    );
    return result.rows[0] || null;
  },

  async updateStatus(
    id: string,
    type: "is_read" | "is_marked" | "is_rejected",
    value: boolean,
  ) {
    const result = await db.query(
      `UPDATE campaigns SET ${type} = $1 WHERE id = $2 RETURNING *`,
      [value, id],
    );

    // Send rejection email if rejected
    if (type === "is_rejected" && value === true) {
      const campaign = await CampaignService.getById(id);
      if (campaign?.email) {
        await CampaignService.sendRejectionEmail(
          campaign.email,
          campaign.rejected_message,
        );
      }
    }
    return result.rows[0] || null;
  },

  async sendRejectionEmail(email: string, message: string = "") {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "titumiranan.gtc@gmail.com",
        pass: "lmke ziod tysh bcgo", // ⚠️ Consider using environment variables for security
      },
    });

    await transporter.sendMail({
      from: '"Campaign Team" <titumiranan.gtc@gmail.com>',
      to: email,
      subject: "Your Campaign Was Rejected",
      text:
        message.length > 0
          ? message
          : "Sorry, your campaign was rejected. Please contact us for more information.",
    });
  },
};
