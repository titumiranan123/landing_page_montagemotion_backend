import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { faqService } from "./faq.services";

export const createFaq = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await faqService.createFaq(req.body);

    if (result) {
      return responseHandler(
        res,
        201,
        true,
        "FAQ created successfully",
        result
      );
    }

    return responseHandler(
      res,
      400,
      false,
      "Failed to create FAQ. Please try again."
    );
  }
);

export const getAllFaqs = asyncHandler(async (_req: Request, res: Response) => {
  const result = await faqService.getAllService();

  if (result && result.length > 0) {
    return responseHandler(
      res,
      200,
      true,
      "FAQs retrieved successfully",
      result
    );
  }
  return responseHandler(res, 404, false, "No FAQs found.");
});

export const getFaqById = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await faqService.getServiceById(req.params.id);

    if (result && result.length > 0) {
      return responseHandler(
        res,
        200,
        true,
        "FAQ retrieved successfully",
        result[0]
      );
    }
    return responseHandler(
      res,
      404,
      false,
      `No FAQ found with ID: ${req.params.id}`
    );
  }
);

export const updateFaqById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await faqService.updateServiceById(req.body, req.params.id);

    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "FAQ updated successfully",
        result
      );
    }
    return responseHandler(
      res,
      400,
      false,
      `Failed to update FAQ with ID: ${req.params.id}. Please check the data.`
    );
  }
);

export const deleteFaqById = asyncHandler(
  async (req: Request, res: Response) => {
    const result: any = await faqService.deleteServiceById(req.params.id);

    if (result && result > 0) {
      return responseHandler(res, 200, true, "FAQ deleted successfully.");
    }
    return responseHandler(
      res,
      404,
      false,
      `No FAQ found with ID: ${req.params.id}`
    );
  }
);
