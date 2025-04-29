import { db } from "../../db/db";
import { errorLogger, logger } from "../../logger/logger";
import { IVideo } from "./work.interface";

export const VideosService = {
  async addVideo(data: IVideo) {
    try {
      const lastdata = await db.query(
        `SELECT * FROM Works ORDER BY position DESC LIMIT 1`
      );
      const newPosition =
        lastdata.rows.length > 0 ? lastdata.rows[0].position + 1 : 1;
      const result = await db.query(
        `INSERT INTO Works (title,description,thumbnail,video_link,is_visible,is_feature,position,type) VALUES ($1, $2, $3, $4, $5,$6,$7,$8) RETURNING *`,
        [
          data.title,
          data.description,
          data.thumbnail,
          data.video_link,
          data.isVisible || true,
          (data.isFeature = false),
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
    // const cacheKey = "videos";
    // const cashData = await getCache(cacheKey);
    // if (cashData?.length > 0) return cashData;
    const result = await db.query(`SELECT * FROM Works`);
    // await setCache(cacheKey, result.rows);
    return result.rows;
  },
  async getAllVideosforWebsite(query: { id?: string; type?: string }) {
    // const cacheKey = "videos";
    // const cashData = await getCache(cacheKey);
    // if (cashData?.length > 0) return cashData;
    let basedQuery = `SELECT * FROM Works`;
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
    if(conditions.length>0){
      basedQuery += ` WHERE ` + conditions.join('AND')
    }
    console.log(basedQuery)
    const result = await db.query(basedQuery,values);
    // await setCache(cacheKey, result.rows);
    return result.rows;
  },
  async getVideosById(id: string) {
    const result = await db.query(`SELECT * FROM Works WHERE id = $1`, [id]);

    return result.rows;
  },
  async updateVideosPositions(videos: IVideo[]) {
    try {
      console.log(videos);
      const client = await db.connect();
      try {
        await client.query("BEGIN");
        for (const video of videos) {
          await client.query(`UPDATE Works SET position = $1 WHERE id = $2`, [
            video.position,
            video.id,
          ]);
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
