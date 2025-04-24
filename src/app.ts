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

const app = express();
app.use(cors({
  origin:"http://localhost:3000",
  methods:['GET','POST','PUT','PATCH','DELETE'],
  credentials:true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use("/api", uploadRoute);

app.get("/", (_req, res) => {
  res.send("connected");
});



app.use(globalErrorHandler);

(async () => {
  await redisClient.set("test-key", "Hello Redis Cloud!");
  const value = await redisClient.get("test-key");
  logger.info("Redis Test Value:", value);
})();

app.listen(config.port, () => {
  logger.info("db connected");
});
