/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { IVideo } from "./work.interface";

export const VideosService = {
  // CREATE
  async addVideo(data: IVideo) {
    try {
      const lastdata = await db.query(
        `SELECT * FROM works WHERE type = $1 ORDER BY position DESC LIMIT 1`,
        [data.type],
      );
      const newPosition =
        lastdata.rows.length > 0 ? lastdata.rows[0].position + 1 : 1;

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
          data.sub_type || null,
        ],
      );
      return result.rows[0] || null;
    } catch (error) {
      errorLogger.error(error);
      throw error;
    }
  },

  // READ all
  async getAllVideos() {
    const result = await db.query(`SELECT * FROM works ORDER BY position ASC`);
    return result.rows;
  },

  // READ by query
  async getAllVideosforWebsite(query: { id?: string; type?: string }) {
    let basedQuery = `SELECT * FROM works`;
    const conditions = [];
    const values = [];

    if (query.id) {
      values.push(query.id);
      conditions.push(`id = $${values.length}`);
    }
    if (query.type) {
      values.push(query.type);
      conditions.push(`type = $${values.length}`);
    }

    if (conditions.length > 0) {
      basedQuery += ` WHERE ` + conditions.join(" AND ");
    }
    basedQuery += ` ORDER BY position ASC`;

    const result = await db.query(basedQuery, values);
    return result.rows;
  },

  // READ by id
  async getVideosById(id: string) {
    const result = await db.query(`SELECT * FROM works WHERE id = $1`, [id]);
    return result.rows[0] || null;
  },

  // UPDATE single video
  async updateVideo(id: string, data: Partial<IVideo>) {
    try {
      const fields = [];
      const values = [];
      let index = 1;

      for (const key in data) {
        fields.push(`${key} = $${index++}`);
        values.push((data as any)[key]);
      }

      values.push(id); // last for WHERE id

      const query = `UPDATE works SET ${fields.join(", ")} WHERE id = $${index} RETURNING *`;
      const result = await db.query(query, values);
      return result.rows[0] || null;
    } catch (error) {
      errorLogger.error(error);
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
      return result.rows[0] || null;
    } catch (error) {
      errorLogger.error(error);
      throw error;
    }
  },

  // UPDATE Multiple video positions
  async updateVideosPositions(videos: IVideo[]) {
    try {
      const client = await db.connect();
      try {
        await client.query("BEGIN");

        // Step 1: Group videos by type
        const groupedByType: Record<string, IVideo[]> = {};
        for (const video of videos) {
          if (!groupedByType[video.type]) {
            groupedByType[video.type] = [];
          }
          groupedByType[video.type].push(video);
        }

        // Step 2: For each type, sort and assign positions starting from 1
        for (const type in groupedByType) {
          const group = groupedByType[type];

          // You can sort based on old position or any logic
          group.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

          for (let i = 0; i < group.length; i++) {
            const video = group[i];
            const newPosition = i + 1;

            await client.query(`UPDATE works SET position = $1 WHERE id = $2`, [
              newPosition,
              video.id,
            ]);
          }
        }

        await client.query("COMMIT");
        return videos;
      } catch (error) {
        await client.query("ROLLBACK");
        errorLogger.error(error);
        throw error;
      } finally {
        client.release();
      }
    } catch (error) {
      errorLogger.error(error);
      throw error;
    }
  },
};
