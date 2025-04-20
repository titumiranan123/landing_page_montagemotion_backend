import { Request, Response } from "express";

import { responseHandler } from "../../utils/responseHandler";
import { asyncHandler } from "../../midleware/asyncHandler";
import { faqService } from "./faq.services";

export const createFaq = asyncHandler(async (req: Request, res: Response) => {
  const result = await faqService.createFaq(req.body);
  return responseHandler(res, 201, true, "FAQ created successfully", result);
});

export const updateFaq = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await faqService.updateFaq(id, req.body);
  return responseHandler(res, 200, true, "FAQ updated successfully", result);
});

export const getAllFaqs = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query
  const result = await faqService.getFilteredFaqs(query);
  return responseHandler(res, 200, true, "All FAQs fetched", result);
});

export const getFaqById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await faqService.getFaqById(id);
  if (result) {
    return responseHandler(res, 200, true, "FAQ fetched", result);
  }
  return responseHandler(res, 404, false, "FAQ not found");
});

export const getFaqByType = asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.params;
  const result = await faqService.getFaqByType(type);
  return responseHandler(res, 200, true, "FAQs fetched by type", result);
});

export const deleteFaq = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await faqService.deleteFaq(id);
  return responseHandler(res, 200, true, "FAQ deleted successfully", result);
});
