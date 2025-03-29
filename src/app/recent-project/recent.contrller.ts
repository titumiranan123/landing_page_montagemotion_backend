import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { VideosService } from "../recent-project/recent.service";

export const createVideo = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    console.log("req.bodr ", req.body);
    const result = await VideosService.addVideo(req.body);

    if (result) {
      return responseHandler(
        res,
        201,
        true,
        "Video created successfully",
        result
      );
    }

    return responseHandler(res, 400, false, "Video creation failed");
  }
);

export const getAllVideos = asyncHandler(
  async (_req: Request, res: Response, next: NextFunction) => {
    const result = await VideosService.getAllVideos();
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "Video Retrive successfully",
        result
      );
    }
    responseHandler(res, 400, false, "Video Retrive failed", result);
  }
);
export const getVideosById = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await VideosService.getVideosById(req.params.id);
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "Video Retrive successfully",
        result
      );
    }
    responseHandler(res, 400, false, "Video Retrive failed", result);
  }
);
export const updateVideosById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await VideosService.getVideosById(req.params.id);
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "Video Retrive successfully",
        result
      );
    }
    responseHandler(res, 400, false, "Video Retrive failed", result);
  }
);
export const updateVideosposition = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await VideosService.updateVideosPositions(
      req.body
    );
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "Videos update successfully",
        result
      );
    }
    responseHandler(res, 400, false, "Videos update failed", result);
  }
);
