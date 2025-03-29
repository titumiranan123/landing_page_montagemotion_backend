import express from "express";
import cors from "cors";
import config from "./config";
import { logger } from "./logger/logger";
import redisClient from "./db/redis";
import faqRoute from "./app/faq/faq.routes";
import headerRoute from "./app/header/header.routes";
import pricingRoute from "./app/pricing/pricing.route";
import testimonialRoute from "./app/testimonial/testimonial.route";
import recentRoute from "./app/recent-project/recent.route";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", faqRoute);
app.use("/api", headerRoute);
app.use("/api", pricingRoute);
app.use("/api/", testimonialRoute);
app.use("/api", recentRoute);

app.get("/", (_req, res) => {
  res.send("connected");
});
(async () => {
  await redisClient.set("test-key", "Hello Redis Cloud!");
  const value = await redisClient.get("test-key");
  logger.info("Redis Test Value:", value);
})();
app.listen(config.port, () => {
  logger.info("db connected");
});
