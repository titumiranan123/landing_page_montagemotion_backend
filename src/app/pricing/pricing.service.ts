import { db } from "../../db/db";
import { errorLogger } from "../../logger/logger";
import { getCache, setCache } from "../../utils/cache";
import { IPackage } from "./pricing.interface";

export const packageService = {
    async  createPackage(data:IPackage)  {
        try {
            const { name, price, duration, delivery_days, revisions, features, type } = data;
  
            const result = await db.query(
              `INSERT INTO packages (name, price, duration, delivery_days, revisions, features, type) 
              VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
              [name, price, duration, delivery_days, revisions, features, type]
            );
            return result.rows || null
        } catch (error) {
            console.log(error)
            errorLogger.error(error)
        }
    },
    async  getAllPackage()  {
        try {
              const cacheKey = "pricings";
                const cashData = await getCache(cacheKey);
                if (cashData?.length > 0) return cashData;
                const result  =  await db.query(`SELECT * FROM packages `)
                await setCache(cacheKey, result.rows);
                return result.rows;
        } catch (error) {
            errorLogger.error(error)
        }
    },
    async  getPackageById(id:string)  {
        try {
            const cacheKey = "pricing";
            const cashData = await getCache(cacheKey);
            if (cashData?.length > 0) return cashData;
            const result = await db.query(`SELECT * FROM packages WHERE id = $1`,[id]);
            await setCache(cacheKey, result.rows);
            return result.rows;
        } catch (error) {
            errorLogger.error(error)
        }
    },
    async  updatePackageById(data:IPackage,id:string)  {
        try {
            return null
        } catch (error) {
            errorLogger.error(error)
        }
    },
    async deletePackageById(id: string) {
        try {
      
            const result = await db.query(
                `DELETE FROM packages WHERE id = $1`, 
                [id]
            );
            return result.rowCount;
        } catch (error:any) {
            errorLogger.error(error);
        }
    }
    
}


