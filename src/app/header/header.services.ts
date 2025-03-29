import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { getCache, setCache } from "../../utils/cache";
import { IHeader } from "./header.interface";



export const headerVideoService = {
  async addHeaderVideo(data: IHeader) {
    try {
  
      const result = await db.query(
        `INSERT INTO headervideo (thumbnail,video_link,isActive,type) VALUES ($1, $2, $3, $4) RETURNING *`,
        [
          data.thumbnail,
          data.video_link,
          data.isActive || true,
          data.type,
        ]
      );
      return result.rows || null;
    } catch (error) {
      errorLogger.error(error);
    }
  },
  async getAllHeadervideo() {
    const cacheKey = "headervideo";
    const cashData = await getCache(cacheKey);
    if (cashData?.length > 0) return cashData;
    const result = await db.query(`SELECT * FROM headervideo`);
    await setCache(cacheKey, result.rows);
    return result.rows;
  },
  async getHeadervideoById(id: string) {
    const result = await db.query(`SELECT * FROM headervideo WHERE id = $1`, [
      id,
    ]);

    return result.rows;
  },
  
};
