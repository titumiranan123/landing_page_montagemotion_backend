import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { testimonialService } from "./testimonial.services";

export const testimonialController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const { name, designation, image, category, type } = req.body;

    // Validate required fields
    if (!name || !designation || !image || !category || !type) {
      return responseHandler(res, 400, false, "Missing required fields");
    }

    const result = await testimonialService.addTestimonial({
      ...req.body,
      message: req.body.message || "",
      video_message: req.body.video_message || "",
    });

    return responseHandler(res, 201, true, "Testimonial created", result);
  }),

  getAll: asyncHandler(async (_req: Request, res: Response) => {
    const result = await testimonialService.getAllTestimonial();
    return responseHandler(res, 200, true, "Testimonials fetched", result);
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, false, "Testimonial ID is required");
    }

    const result = await testimonialService.getTestimonialById(id);

    if (!result) {
      return responseHandler(res, 404, false, "Testimonial not found");
    }

    return responseHandler(res, 200, true, "Testimonial fetched", result);
  }),

  updatePositions: asyncHandler(async (req: Request, res: Response) => {
    const { testimonials } = req.body;

    if (!Array.isArray(testimonials)) {
      return responseHandler(res, 400, false, "Invalid testimonials array");
    }

    for (const testimonial of testimonials) {
      if (!testimonial.id || testimonial.position == null) {
        return responseHandler(
          res,
          400,
          false,
          "Each testimonial must have id and position",
        );
      }
    }

    const result =
      await testimonialService.updateTestimonialPositions(testimonials);
    return responseHandler(res, 200, true, "Positions updated", result);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, false, "Testimonial ID is required");
    }

    const result = await testimonialService.updateTestimonial(id, {
      ...req.body,
      message: req.body.message ?? "",
      video_message: req.body.video_message ?? "",
    });

    if (!result) {
      return responseHandler(res, 404, false, "Testimonial not found");
    }

    return responseHandler(res, 200, true, "Testimonial updated", result);
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return responseHandler(res, 400, false, "Testimonial ID is required");
    }

    const existing = await testimonialService.getTestimonialById(id);
    if (!existing) {
      return responseHandler(res, 404, false, "Testimonial not found");
    }

    const result = await testimonialService.deleteTestimonialById(id);
    return responseHandler(res, 200, true, "Testimonial deleted", result);
  }),
};
