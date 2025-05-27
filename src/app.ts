import express from "express";
import cors from "cors";
import config from "./config";
import { logger } from "./logger/logger";
import redisClient from "./db/redis";
import faqRoute from "./app/faq/faq.routes";
import headerRoute from "./app/header/header.routes";
import pricingRoute from "./app/pricing/pricing.route";
import testimonialRoute from "./app/testimonial/testimonial.route";
import recentRoute from "./app/work/work.route";
import contactRoute from "./app/contact/conatct.routes";
import AuthRoute from "./app/auth/auth.routes";
import { globalErrorHandler } from "./midleware/globalErrorHandler";
import cookieParser from "cookie-parser";
import faqRouter from "./app/faq/faq.routes";
import stateRouter from "./app/state/state.routes";
import serviceRoute from "./app/services/service.route";
import uploadRoute from "./app/upload/upload.route";
import aboutRoute from "./app/about/about.route";
import blogRoute from "./app/blogs/blog.route";
import webRoute from "./app/homeapis/homeapi.routes";
import memberRoute from "./app/member/member.route";
import { invalidateRoute } from "./midleware/invalideroute";
import seoRoute from "./app/seo/seo.route";
import campaignRoutes from "./app/campaign-aplication/campaign.route";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5001", "http://localhost:5000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));

app.use("/api", faqRoute);
app.use("/api", headerRoute);
app.use("/api", pricingRoute);
app.use("/api/", testimonialRoute);
app.use("/api", recentRoute);
app.use("/api", AuthRoute);
app.use("/api", contactRoute);
app.use("/api", faqRouter);
app.use("/api", stateRouter);
app.use("/api", serviceRoute);
app.use("/api", aboutRoute);
app.use("/api", blogRoute);
app.use("/api", webRoute);
app.use("/api", memberRoute);
app.use("/api", uploadRoute);
app.use("/api", campaignRoutes);
app.use("/api", seoRoute);

app.get("/", (_req, res) => {
  res.send("connected ");
});

app.use(invalidateRoute);
app.use(globalErrorHandler);
(async () => {
  await redisClient.set("test-key", "Hello Redis Cloud!");
  const value = await redisClient.get("test-key");
  logger.info("Redis Test Value:", value);
})();

app.listen(config.port, () => {
  logger.info("db connected");
});
