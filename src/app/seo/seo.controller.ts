import { Request, Response } from "express";
import { seoMetaService } from "./seo.service";

import { responseHandler } from "../../utils/responseHandler";
import { asyncHandler } from "../../midleware/asyncHandler";

export const upsertSeoMeta = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.body || Object.keys(req.body).length === 0) {
      responseHandler(res, 400, false, "SEO meta data is required");
    }

    const result = await seoMetaService.upsertSeoMeta(req.body);

    if (!result) {
      responseHandler(res, 500, false, "Failed to save SEO meta data");
    }

    responseHandler(res, 200, true, "SEO meta data saved", result);
  },
);

export const getSeoMetaByPage = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { pageName } = req.params;

    if (!pageName) {
      responseHandler(res, 400, false, "Page name is required");
    }

    const result = await seoMetaService.getSeoMetaByPage(pageName);

    if (!result) {
      responseHandler(res, 404, false, "SEO meta data not found");
    }

    responseHandler(res, 200, true, "SEO meta data fetched", result);
  },
);

export const getAllSeoMeta = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const result = await seoMetaService.getAllSeoMeta();

    if (!result || result.length === 0) {
      responseHandler(res, 404, false, "No SEO meta data found");
    }

    responseHandler(res, 200, true, "All SEO meta data fetched", result);
  },
);

export const deleteSeoMetaByPage = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { pageName } = req.params;

    if (!pageName) {
      responseHandler(res, 400, false, "Page name is required");
    }

    const result = await seoMetaService.deleteSeoMetaByPage(pageName);

    if (!result) {
      responseHandler(res, 404, false, "SEO meta data not found");
    }

    responseHandler(res, 200, true, "SEO meta data deleted", result);
  },
);
