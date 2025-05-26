/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { IVideo } from "./work.interface";

export const VideosService = {
  // CREATE
  async addVideo(data: IVideo) {
    try {
      const last = await db.query(
        `SELECT position FROM works WHERE type = $1 ORDER BY position DESC LIMIT 1`,
        [data.type],
      );
      const newPosition = last.rows.length > 0 ? last.rows[0].position + 1 : 1;

      const result = await db.query(
        `INSERT INTO works (title, description, thumbnail, video_link, is_visible, is_feature, position, type, sub_type)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [
          data.title,
          data.description,
          data.thumbnail,
          data.video_link,
          data.is_visible ?? true,
          data.is_feature ?? false,
          newPosition,
          data.type,
          data.sub_type ?? null,
        ],
      );

      return result.rows[0] ?? null;
    } catch (error) {
      errorLogger.error("Add Video Error:", error);
      throw error;
    }
  },

  // READ all videos
  async getAllVideos() {
    const result = await db.query(`SELECT * FROM works ORDER BY position ASC`);
    return result.rows;
  },

  // READ by query (for website)
  async getAllVideosforWebsite(query: { id?: string; type?: string }) {
    let baseQuery = `SELECT * FROM works`;
    const conditions: string[] = [];
    const values: any[] = [];

    if (query.id) {
      values.push(query.id);
      conditions.push(`id = $${values.length}`);
    }

    if (query.type) {
      values.push(query.type);
      conditions.push(`type = $${values.length}`);
    }

    if (conditions.length > 0) {
      baseQuery += ` WHERE ` + conditions.join(" AND ");
    }

    baseQuery += ` ORDER BY position ASC`;

    const result = await db.query(baseQuery, values);
    return result.rows;
  },

  // READ by id
  async getVideosById(id: string) {
    const result = await db.query(`SELECT * FROM works WHERE id = $1`, [id]);
    return result.rows[0] ?? null;
  },

  // UPDATE single video
  async updateVideo(id: string, data: Partial<IVideo>) {
    try {
      const fields: string[] = [];
      const values: any[] = [];
      let index = 1;

      for (const key in data) {
        if (data[key as keyof IVideo] !== undefined) {
          fields.push(`${key} = $${index}`);
          values.push(data[key as keyof IVideo]);
          index++;
        }
      }

      if (fields.length === 0) return null;

      values.push(id); // for WHERE clause

      const query = `UPDATE works SET ${fields.join(", ")} WHERE id = $${index} RETURNING *`;
      const result = await db.query(query, values);
      return result.rows[0] ?? null;
    } catch (error) {
      errorLogger.error("Update Video Error:", error);
      throw error;
    }
  },

  // DELETE video
  async deleteVideo(id: string) {
    try {
      const result = await db.query(
        `DELETE FROM works WHERE id = $1 RETURNING *`,
        [id],
      );
      return result.rows[0] ?? null;
    } catch (error) {
      errorLogger.error("Delete Video Error:", error);
      throw error;
    }
  },

  // UPDATE multiple videos' positions
  async updateVideosPositions(videos: IVideo[]) {
    try {
      const client = await db.connect();
      try {
        await client.query("BEGIN");

        // Group videos by type
        const grouped: Record<string, IVideo[]> = {};
        for (const video of videos) {
          if (!video.type || !video.id) continue;
          if (!grouped[video.type]) grouped[video.type] = [];
          grouped[video.type].push(video);
        }

        for (const type in grouped) {
          const group = grouped[type];

          group.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

          for (let i = 0; i < group.length; i++) {
            const newPosition = i + 1;
            await client.query(`UPDATE works SET position = $1 WHERE id = $2`, [
              newPosition,
              group[i].id,
            ]);
          }
        }

        await client.query("COMMIT");
        return videos;
      } catch (error) {
        await client.query("ROLLBACK");
        errorLogger.error("Update Video Positions Error:", error);
        throw error;
      } finally {
        client.release();
      }
    } catch (error) {
      errorLogger.error("DB Connection Error:", error);
      throw error;
    }
  },
};
