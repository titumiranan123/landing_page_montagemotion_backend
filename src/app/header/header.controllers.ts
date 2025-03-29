import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { headerVideoService } from "./header.services";


export const createHeaderVideo = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
console.log(req.body)
    const result = await headerVideoService.addHeaderVideo(req.body);

    if (result) {
      return responseHandler(
        res,
        201,
        true,
        "HeaderVideo created successfully",
        result
      );
    }

    return responseHandler(res, 400, false, "HeaderVideo creation failed");
  }
);

export const getAllHeaderVideo = asyncHandler(
  async (_req: Request, res: Response, next: NextFunction) => {
    const result = await headerVideoService.getAllHeadervideo();
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "HeaderVideo Retrive successfully",
        result
      );
    }
    responseHandler(res, 400, false, "HeaderVideo Retrive failed", result);
  }
);
export const getHeaderVideoById = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await headerVideoService.getHeadervideoById(req.params.id);
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "HeaderVideo Retrive successfully",
        result
      );
    }
    responseHandler(res, 400, false, "Headervideo Retrive failed", result);
  }
);
export const updateHeadervideoById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await headerVideoService.getHeadervideoById(req.params.id);
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "HeaderVideo Retrive successfully",
        result
      );
    }
    responseHandler(res, 400, false, "HeaderVideo Retrive failed", result);
  }
);

