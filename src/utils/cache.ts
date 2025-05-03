/* eslint-disable @typescript-eslint/no-explicit-any */
import redisClient from "../db/redis";

export const setCache = async (key: string, value: any, expiry = 3600) => {
  await redisClient.set(key, JSON.stringify(value), { EX: expiry });
};

export const getCache = async (key: string) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};
