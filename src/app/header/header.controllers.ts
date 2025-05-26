import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { headerService } from "./header.services";

export const createHeaderVideo = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await headerService.addOrUpdateHeader(req.body);
    if (result) {
      return responseHandler(
        res,
        201,
        true,
        "Header saved successfully",
        result,
      );
    }
    return responseHandler(res, 400, false, "Header operation failed");
  },
);

export const getAllHeaderVideos = asyncHandler(
  async (req: Request, res: Response) => {
    const { type } = req.query;

    const result = await headerService.getAllHeaders(type as string);
    return responseHandler(res, 200, true, "Fetched all header videos", result);
  },
);
