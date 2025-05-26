import { Request, Response } from "express";

import { responseHandler } from "../../utils/responseHandler";
import { VideosService } from "./workservice";
import { asyncHandler } from "../../midleware/asyncHandler";

// CREATE
export const createVideo = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body) {
    return responseHandler(res, 400, false, "Invalid input data");
  }

  const result = await VideosService.addVideo(req.body);
  return result
    ? responseHandler(res, 201, true, "Work created successfully", result)
    : responseHandler(res, 400, false, "Work creation failed");
});

// READ ALL
export const getAllVideos = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await VideosService.getAllVideos();
    return result
      ? responseHandler(res, 200, true, "Works retrieved successfully", result)
      : responseHandler(res, 404, false, "No videos found");
  },
);

// READ ALL (Website / Query based)
export const getAllVideosForWebsite = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await VideosService.getAllVideosforWebsite(req.query);
    return result
      ? responseHandler(res, 200, true, "Works retrieved successfully", result)
      : responseHandler(res, 404, false, "No videos found for query");
  },
);

// READ BY ID
export const getVideosById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return responseHandler(res, 400, false, "ID is required");
    }

    const result = await VideosService.getVideosById(id);
    return result
      ? responseHandler(res, 200, true, "Work retrieved successfully", result)
      : responseHandler(res, 404, false, "Work not found");
  },
);

// UPDATE BY ID
export const updateVideosById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || !req.body) {
      return responseHandler(res, 400, false, "Invalid ID or input data");
    }

    const result = await VideosService.updateVideo(id, req.body);
    return result
      ? responseHandler(res, 200, true, "Work updated successfully", result)
      : responseHandler(res, 400, false, "Work update failed");
  },
);

// UPDATE POSITIONS (multiple)
export const updateVideosPosition = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.body || !Array.isArray(req.body)) {
      return responseHandler(res, 400, false, "Invalid positions data");
    }

    const result = await VideosService.updateVideosPositions(req.body);
    return result
      ? responseHandler(
          res,
          200,
          true,
          "Video positions updated successfully",
          result,
        )
      : responseHandler(res, 400, false, "Video position update failed");
  },
);

// DELETE BY ID
export const deleteVideoById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return responseHandler(res, 400, false, "ID is required");
    }

    const result = await VideosService.deleteVideo(id);
    return result
      ? responseHandler(res, 200, true, "Work deleted successfully", result)
      : responseHandler(res, 404, false, "Work not found or delete failed");
  },
);
