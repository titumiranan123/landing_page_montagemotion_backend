import { db } from "../../db/db";
import { IBlog } from "./blogs.inteface";

export function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-") // replace spaces with dashes
      .replace(/-+/g, "-") // collapse multiple dashes
      .substring(0, 100); // limit to 100 chars if needed
  }
  
export const BlogService = {
    async createBlog(data: IBlog) {
        const slug = generateSlug(data.title);
      
        // Get the highest current position
        const positionResult = await db.query(
          `SELECT MAX(position) as max FROM blogs`
        );
        const lastPosition = positionResult.rows[0].max || 0;
        const newPosition = lastPosition + 1;
      
        const result = await db.query(
          `INSERT INTO blogs (title, short_description, description, image, is_publish, is_feature, slug, position, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
           RETURNING *`,
          [
            data.title,
            data.short_description,
            data.description,
            data.image,
            data.is_publish || false,
            data.is_feature || false,
            slug,
            newPosition,
          ]
        );
        return result.rows[0];
      }
,      
  async getAllBlogs() {
    const result = await db.query(`SELECT * FROM blogs ORDER BY created_at DESC`);
    return result.rows;
  },

  async getBlogById(id: string) {
    const result = await db.query(`SELECT * FROM blogs WHERE id = $1`, [id]);
    return result.rows[0] || null;
  },

  async updateBlog(id: string, data: Partial<IBlog>) {
    const existing = await BlogService.getBlogById(id);
    if (!existing) throw new Error("Blog not found");

    const updated = {
      ...existing,
      ...data,
    };

    const result = await db.query(
      `UPDATE blogs
       SET title = $1,
           short_description = $2,
           description = $3,
           image = $4,
           is_publish = $5,
           is_feature = $6,
           updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [
        updated.title,
        updated.short_description,
        updated.description,
        updated.image,
        updated.is_publish,
        updated.is_feature,
        id
      ]
    );
    return result.rows[0];
  },
  async updateBlogPosition(blogs: { id: string; position: number }[]) {
    const updates: Promise<any>[] = [];
    for (const blog of blogs) {
      const existing = await db.query(
        `SELECT position FROM blogs WHERE id = $1`,
        [blog.id]
      );
      const currentPosition = existing.rows[0]?.position;
  
      if (currentPosition !== blog.position) {
        const updateQuery = db.query(
          `UPDATE blogs SET position = $1 WHERE id = $2`,
          [blog.position, blog.id]
        );
        updates.push(updateQuery);
      }
    }
  
    // Await all updates
    await Promise.all(updates);
  }
,  
  async deleteBlog(id: string) {
    const result = await db.query(`DELETE FROM blogs WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0] || null;
  },
};
