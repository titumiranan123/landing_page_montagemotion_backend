import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { aboutService } from "./about.service";
import { logger } from "../../logger/logger";

// Create or update about section (only one row allowed)
export const createOrUpdateAbout = asyncHandler(
  async (req: Request, res: Response) => {
    logger.info("req.body", req.body);
    const result = await aboutService.createOrUpdateAbout(req.body);
    return responseHandler(
      res,
      200,
      true,
      "About content saved successfully",
      result,
    );
  },
);

export const getAllAbouts = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await aboutService.getAllAbouts();
    return responseHandler(res, 200, true, "All abouts fetched", result);
  },
);
