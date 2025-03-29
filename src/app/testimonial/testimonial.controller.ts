import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { VideosService } from "../recent-project/recent.service";

export const createTestimonial = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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

export const getAllTestimonial = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await VideosService.getAllVideos();
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "Testimonial Retrive successfully",
        result
      );
    }
    responseHandler(res, 400, false, "Testimonial Retrive failed", result);
  }
);
export const getTestimonialById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await VideosService.getVideosById(req.params.id);
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "Testimonial Retrive successfully",
        result
      );
    }
    responseHandler(res, 400, false, "Testimonial Retrive failed", result);
  }
);
export const updateTestimonialById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await VideosService.getVideosById(req.params.id);
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "Testimonial Retrive successfully",
        result
      );
    }
    responseHandler(res, 400, false, "Testimonial Retrive failed", result);
  }
);
export const updateTestimonialposition = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await VideosService.updateVideosPositions(
      req.body
    );
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "Testimonials update successfully",
        result
      );
    }
    responseHandler(res, 400, false, "Testimonials update failed", result);
  }
);
