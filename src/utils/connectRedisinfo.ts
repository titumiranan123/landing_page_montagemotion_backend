import redisClient from "../db/redis";
import { logger } from "../logger/logger";

export const connectRedis = async () => {
  await redisClient.set("test-key", "Hello Redis Cloud!");
  const value = await redisClient.get("test-key");
  logger.info("Redis Test Value:", value);
};
