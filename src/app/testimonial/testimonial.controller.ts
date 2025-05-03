import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { testimonialService } from "./testimonial.services";

export const createTestimonial = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await testimonialService.addTestimonial(req.body);
    if (result) {
      return responseHandler(
        res,
        201,
        true,
        "Testimonial created successfully",
        result,
      );
    }

    return responseHandler(res, 400, false, "Video creation failed");
  },
);

export const getAllTestimonial = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await testimonialService.getAllTestimonial();
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "Testimonial Retrive successfully",
        result,
      );
    }
    responseHandler(res, 400, false, "Testimonial Retrive failed", result);
  },
);
export const getTestimonialById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await testimonialService.getTestimonialById(req.params.id);
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "Testimonial Retrive successfully",
        result,
      );
    }
    responseHandler(res, 400, false, "Testimonial Retrive failed", result);
  },
);
export const updateTestimonialById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await testimonialService.getTestimonialById(req.params.id);
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "Testimonial Retrive successfully",
        result,
      );
    }
    responseHandler(res, 400, false, "Testimonial Retrive failed", result);
  },
);
export const updateTestimonialposition = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await testimonialService.updateTestimonialPositions(
      req.body,
    );
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "Testimonials update successfully",
        result,
      );
    }
    responseHandler(res, 400, false, "Testimonials update failed", result);
  },
);
