import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { VideosService } from "./workservice";

// CREATE
export const createVideo = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await VideosService.addVideo(req.body);
    if (result) {
      return responseHandler(res, 201, true, "Works created successfully", result);
    }
    return responseHandler(res, 400, false, "Works creation failed");
  }
);

// READ ALL
export const getAllVideos = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await VideosService.getAllVideos();
    if (result) {
      return responseHandler(res, 200, true, "Works retrieved successfully", result);
    }
    responseHandler(res, 400, false, "Works retrieve failed");
  }
);

// READ ALL (Website / Query based)
export const getAllVideosForWebsite = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await VideosService.getAllVideosforWebsite(req.query);
    if (result) {
      return responseHandler(res, 200, true, "Works retrieved successfully", result);
    }
    responseHandler(res, 400, false, "Works retrieve failed");
  }
);

// READ BY ID
export const getVideosById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await VideosService.getVideosById(req.params.id);
    if (result) {
      return responseHandler(res, 200, true, "Work retrieved successfully", result);
    }
    responseHandler(res, 404, false, "Work not found");
  }
);

// UPDATE BY ID ✅ (Fixed)
export const updateVideosById = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.body)
    const result = await VideosService.updateVideo(req.params.id, req.body);
    if (result) {
      return responseHandler(res, 200, true, "Work updated successfully", result);
    }
    responseHandler(res, 400, false, "Work update failed");
  }
);

// UPDATE POSITIONS (multiple)
export const updateVideosPosition = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await VideosService.updateVideosPositions(req.body);
    if (result) {
      return responseHandler(res, 200, true, "Video positions updated successfully", result);
    }
    responseHandler(res, 400, false, "Video position update failed");
  }
);

// DELETE BY ID ✅ (Bonus)
export const deleteVideoById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await VideosService.deleteVideo(req.params.id);
    if (result) {
      return responseHandler(res, 200, true, "Work deleted successfully", result);
    }
    responseHandler(res, 404, false, "Work not found or delete failed");
  }
);
