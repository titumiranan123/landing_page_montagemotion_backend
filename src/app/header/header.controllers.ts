import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { headerVideoService } from "./header.services";



export const createHeaderVideo = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await headerVideoService.addHeaderVideo(req.body);
    if (result) {
      return responseHandler(res, 201, true, "Header video created successfully", result);
    }
    return responseHandler(res, 400, false, "Header video creation failed");
  }
);

export const getAllHeaderVideos = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await headerVideoService.getAllHeadervideo();
    return responseHandler(res, 200, true, "Fetched all header videos", result);
  }
);

export const getHeaderVideoById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await headerVideoService.getHeadervideoById(id);
    if (result?.length > 0) {
      return responseHandler(res, 200, true, "Header video fetched", result);
    }
    return responseHandler(res, 404, false, "Header video not found");
  }
);

export const getHeaderVideoByType = asyncHandler(
  async (req: Request, res: Response) => {
    const { type } = req.params;
    const result = await headerVideoService.getHeadervideoBytype(type);
    if (result?.length > 0) {
      return responseHandler(res, 200, true, "Header video fetched by type", result);
    }
    return responseHandler(res, 404, false, "No header video found with this type");
  }
);

// export const updateHeaderVideoActive = asyncHandler(
//   async (req: Request, res: Response) => {
//     console.log("hitted")
//     const { id } = req.params;
//     const { nextActiveId } = req.body;
//     const result = await headerVideoService.updateHeadervideoActive(nextActiveId, id);
//     return responseHandler(res, 200, true, "Header video active status updated", result);
//   }
// );

// export const updateHeaderVideo = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result = await headerVideoService.updateHeadervideoById(req.body, id);
//     return responseHandler(res, 200, true, "Header video updated", result);
//   }
// );

// export const deleteHeaderVideo = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result = await headerVideoService.deletHeadervideoById(id);
//     return responseHandler(res, 200, true, "Header video deleted", result);
//   }
// );
