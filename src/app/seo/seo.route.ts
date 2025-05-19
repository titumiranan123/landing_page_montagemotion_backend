import express from "express";
import {
  deleteSeoMetaByPage,
  getAllSeoMeta,
  getSeoMetaByPage,
  upsertSeoMeta,
} from "./seo.controller";
import { validate } from "../../midleware/validate";
import { seoMetaSchema } from "./seo.zod";

const seoRoute = express.Router();

seoRoute.post("/seo", validate(seoMetaSchema.partial()), upsertSeoMeta);
seoRoute.get("/seo", getAllSeoMeta);
seoRoute.get("/seo/:pageName", getSeoMetaByPage);
seoRoute.delete("seo/:pageName", deleteSeoMetaByPage);

export default seoRoute;
