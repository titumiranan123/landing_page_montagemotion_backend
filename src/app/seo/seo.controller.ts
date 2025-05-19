import { Request, Response } from "express";

import { seoMetaService } from "./seo.service";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";

export const upsertSeoMeta = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await seoMetaService.upsertSeoMeta(req.body);
    return responseHandler(res, 200, true, "SEO Meta data saved", result);
  },
);

export const getSeoMetaByPage = asyncHandler(
  async (req: Request, res: Response) => {
    const { pageName } = req.params;
    const result = await seoMetaService.getSeoMetaByPage(pageName);
    if (result) {
      return responseHandler(res, 200, true, "SEO Meta data fetched", result);
    }
    return responseHandler(res, 404, false, "SEO Meta data not found");
  },
);

export const getAllSeoMeta = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await seoMetaService.getAllSeoMeta();
    return responseHandler(res, 200, true, "All SEO Meta data fetched", result);
  },
);

export const deleteSeoMetaByPage = asyncHandler(
  async (req: Request, res: Response) => {
    const { pageName } = req.params;
    const result = await seoMetaService.deleteSeoMetaByPage(pageName);
    if (result) {
      return responseHandler(res, 200, true, "SEO Meta deleted", result);
    }
    return responseHandler(res, 404, false, "SEO Meta not found");
  },
);
