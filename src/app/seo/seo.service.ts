import { db } from "../../db/db";
import { SeoMeta } from "./seo.interface";

export const seoMetaService = {
  async upsertSeoMeta(data: SeoMeta) {
    const result = await db.query(
      `
      INSERT INTO seo_meta (
        page_name, meta_title, meta_description, meta_keywords,
        canonical_url, robots, og_title, og_description,
        og_image, schema, structured_data, updated_at
      )
      VALUES (
        $1, $2, $3, $4,
        $5, $6, $7, $8,
        $9, $10, $11, NOW()
      )
      ON CONFLICT (page_name) DO UPDATE SET
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        meta_keywords = EXCLUDED.meta_keywords,
        canonical_url = EXCLUDED.canonical_url,
        robots = EXCLUDED.robots,
        og_title = EXCLUDED.og_title,
        og_description = EXCLUDED.og_description,
        og_image = EXCLUDED.og_image,
        schema = EXCLUDED.schema,
        structured_data = EXCLUDED.structured_data,
        updated_at = NOW()
      RETURNING *;
      `,
      [
        data.page_name,
        data.metaTitle,
        data.metaDescription,
        data.metaKeywords,
        data.canonicalUrl,
        data.robots,
        data.ogTitle,
        data.ogDescription,
        data.ogImage,
        data.schema,
        JSON.stringify(data.structuredData || {}),
      ],
    );

    return result.rows[0];
  },

  async getSeoMetaByPage(pageName: string) {
    const result = await db.query(
      `SELECT * FROM seo_meta WHERE page_name = $1 LIMIT 1`,
      [pageName],
    );
    return result.rows[0] || null;
  },

  async getAllSeoMeta() {
    const result = await db.query(`SELECT * FROM seo_meta`);
    return result.rows;
  },

  async deleteSeoMetaByPage(pageName: string) {
    const result = await db.query(
      `DELETE FROM seo_meta WHERE page_name = $1 RETURNING *`,
      [pageName],
    );
    return result.rows[0] || null;
  },
};
