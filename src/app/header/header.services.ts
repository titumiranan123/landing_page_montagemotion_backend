import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { getCache, setCache } from "../../utils/cache";
import { IHeader } from "./header.interface";

export const headerVideoService = {
  async addHeaderVideo(data: IHeader) {
    try {
      if (data.isActive) {
        await db.query(`UPDATE headers SET isActive = false WHERE type = $1`, [
          data.type,
        ]);
      }

      const result = await db.query(
        `INSERT INTO headers (thumbnail, video_link, isActive, type) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`,
        [data.thumbnail, data.video_link, data.isActive, data.type]
      );

      return result.rows || null;
    } catch (error) {
      errorLogger.error(error);
      throw new Error("Failed to insert header video.");
    }
  },

  async getAllHeadervideo() {
    const cacheKey = "headervideo";
    // const cacheData = await getCache(cacheKey);
    // if (cacheData?.length > 0) return cacheData;
    const result = await db.query(`SELECT * FROM headers`);
    // await setCache(cacheKey, result.rows);
    return result.rows;
  },

  async getHeadervideoById(id: string) {
    const result = await db.query(`SELECT * FROM headers WHERE id = $1`, [id]);
    return result.rows || null;
  },
  async getHeadervideoBytype(type: string) {
    const result = await db.query(`SELECT * FROM headers WHERE type = $1`, [
      type,
    ]);
    return result.rows || null;
  },
  async updateHeadervideoActive(nextActiveId:string, id: string) {
    checkHeaders(id)
    checkHeaders(nextActiveId)
    const client = await db.connect();
    try {
      await client.query("BEGIN");

    // Step 1: Make current active false
    const res1 = await client.query(
      `UPDATE headers SET isActive = false WHERE id = $1 AND isActive = true`,
      [id]
    );

    if (res1.rowCount === 0) {
      throw new Error("Current active header not found or already inactive.");
    }

    // Step 2: Make next one active
    const res2 = await client.query(
      `UPDATE headers SET isActive = true WHERE id = $1 AND isActive = false RETURNING *`,
      [nextActiveId]
    );

    if (res2.rowCount === 0) {
      throw new Error("Next header not found or already active.");
    }

    // If both updates worked, commit
    await client.query("COMMIT");
    return res2.rows;
  } catch (error:any) {
    await client.query("ROLLBACK");
    throw new Error(`Transaction failed: ${error.message}`);
  } finally {
    client.release();
  }
  },
  async updateHeadervideoById(data: IHeader, id: string) {
    checkHeaders(id)
   
    const result = await db.query(
      `UPDATE headers 
       SET thumbnail = $1, video_link = $2, isActive = $3, type = $4 
       WHERE id = $5 
       RETURNING *`,
      [data.thumbnail, data.video_link, data.isActive, data.type, id]
    );
    return result.rows || null;
  },
  async deletHeadervideoById(id: string) {
    checkHeaders(id)
    const result = await db.query(`DELETE FROM headers WHERE id = $1 RETURNING * `, [
      id,
    ]);
    return result.rows || null;
  },
  
};

const checkHeaders = async (id: string) => {
  const res = await db.query(`SELECT 1 FROM headers WHERE id = $1`, [id]);
 
  if (res.rowCount === 0) {
    throw new Error("Header not found");
  }
};

