import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { VideosService } from "./workservice";

export const createVideo = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
   
    const result = await VideosService.addVideo(req.body);

    if (result) {
      return responseHandler(
        res,
        201,
        true,
        "Works created successfully",
        result
      );
    }

    return responseHandler(res, 400, false, "Works creation failed");
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
        "Works Retrive successfully",
        result
      );
    }
    responseHandler(res, 400, false, "Works Retrive failed", result);
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
        "Works Retrive successfully",
        result
      );
    }
    responseHandler(res, 400, false, "Works Retrive failed", result);
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
        "Works Retrive successfully",
        result
      );
    }
    responseHandler(res, 400, false, "Works Retrive failed", result);
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
        "Works update successfully",
        result
      );
    }
    responseHandler(res, 400, false, "Works update failed", result);
  }
);
