import { Request, Response } from "express";

import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { testimonialService } from "./testimonial.services";

export const testimonialController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const result = await testimonialService.addTestimonial(req.body);
    return responseHandler(res, 201, true, "Testimonial created", result);
  }),

  getAll: asyncHandler(async (_req: Request, res: Response) => {
    const result = await testimonialService.getAllTestimonial();
    return responseHandler(res, 200, true, "Testimonials fetched", result);
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const result = await testimonialService.getTestimonialById(req.params.id);
    if (!result)
      return responseHandler(res, 404, false, "Testimonial not found");
    return responseHandler(res, 200, true, "Testimonial fetched", result);
  }),

  updatePositions: asyncHandler(async (req: Request, res: Response) => {
    const result = await testimonialService.updateTestimonialPositions(
      req.body.testimonials,
    );
    return responseHandler(res, 200, true, "Positions updated", result);
  }),
  update: asyncHandler(async (req: Request, res: Response) => {
    const result = await testimonialService.updateTestimonial(
      req.params.id,
      req.body,
    );
    return responseHandler(res, 200, true, "Testimonial updated", result);
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    const result = await testimonialService.deleteTestimonialById(
      req.params.id,
    );
    return responseHandler(res, 200, true, "Testimonial deleted", result);
  }),
};
