import { createClient } from "redis";
import { errorLogger } from "../logger/logger";

const redisClient = createClient({
  username: "default",
  password: "9iM0UhCR0lUWckR02mUtkTeILwQZMFx6",
  socket: {
    host: "redis-11926.c264.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 11926,
  },
});

redisClient.on("error", (err) => errorLogger.error("Redis error", err));

(async () => {
  await redisClient.connect();
})();
export default redisClient;
