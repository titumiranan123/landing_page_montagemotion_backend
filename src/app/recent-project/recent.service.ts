import { db } from "../../db/db";
import { errorLogger, logger } from "../../logger/logger";
import { getCache, setCache } from "../../utils/cache";
import { IVideo } from "./recent.interface";

export const VideosService = {
  async addVideo(data: IVideo) {
    try {
      const lastdata = await db.query(
        `SELECT * FROM videos ORDER BY position DESC LIMIT 1`
      );
      const newPosition =
        lastdata.rows.length > 0 ? lastdata.rows[0].position + 1 : 1;

      const result = await db.query(
        `INSERT INTO videos (thumbnail,video_link,isVisible,position,type) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [
          data.thumbnail,
          data.video_link,
          data.isVisible || true,
          newPosition,
          data.type,
        ]
      );
      return result.rows || null;
    } catch (error) {
      errorLogger.error(error);
    }
  },
  async getAllVideos() {
    const cacheKey = "videos";
    const cashData = await getCache(cacheKey);
    if (cashData.length > 0) return cashData;
    const result = await db.query(`SELECT * FROM videos`);
    await setCache(cacheKey, result.rows);
    return result.rows;
  },
  async getVideosById(id: string) {
    const result = await db.query(`SELECT * FROM videos WHERE id = $1`, [
      id,
    ]);

    return result.rows;
  },
  async updateVideosPositions(videos: IVideo[]) {
    try {
      const client = await db.connect();
      try {
        await client.query("BEGIN");
        for (const video of videos) {
          await client.query(
            `UPDATE videos SET position = $1 WHERE id = $2`,
            [video.position, video.id]
          );
        }
        await client.query("COMMIT");
        return videos;
      } catch (error) {
        await client.query("ROLLBACK");
        errorLogger.error(error);
      } finally {
        client.release();
      }
    } catch (error) {
      errorLogger.error(error);
    }
  },
};
