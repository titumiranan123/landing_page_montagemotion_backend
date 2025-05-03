import { Request, Response } from "express";

import { responseHandler } from "../../utils/responseHandler";
import { asyncHandler } from "../../midleware/asyncHandler";
import { faqService } from "./faq.services";
import { faqItemService } from "./faqitem.service";

export const createFaq = asyncHandler(async (req: Request, res: Response) => {
  const result = await faqService.createOrUpdateFaq(req.body);
  return responseHandler(res, 201, true, "FAQ created successfully", result);
});

export const updateFaq = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await faqService.updateFaq(id, req.body);
  return responseHandler(res, 200, true, "FAQ updated successfully", result);
});

export const getAllFaqs = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;
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

export const getFaqByType = asyncHandler(
  async (req: Request, res: Response) => {
    const { type } = req.params;
    const result = await faqService.getFaqByType(type);
    return responseHandler(res, 200, true, "FAQs fetched by type", result);
  },
);

export const deleteFaq = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await faqService.deleteFaq(id);
  return responseHandler(res, 200, true, "FAQ deleted successfully", result);
});

// Create a FAQ Item
export const createFaqItem = asyncHandler(
  async (req: Request, res: Response) => {
    const { faqId, question, answer, is_visible } = req.body;
    const result = await faqItemService.createFaqItems(faqId, {
      question,
      answer,
      is_visible,
    });
    return responseHandler(
      res,
      201,
      true,
      "FAQ item created successfully",
      result,
    );
  },
);

// Update a FAQ Item
export const updateFaqItem = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await faqItemService.updateFaqItem(id, req.body);
    return responseHandler(
      res,
      200,
      true,
      "FAQ item updated successfully",
      result,
    );
  },
);
// Update a FAQ Item
export const updateFaqItemPosition = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await faqItemService.updateFaqItemPositions(req.body);
    return responseHandler(
      res,
      200,
      true,
      "FAQ item updated successfully",
      result,
    );
  },
);

// Delete a FAQ Item
export const deleteFaqItem = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await faqItemService.deleteFaqItem(id);
    return responseHandler(
      res,
      200,
      true,
      "FAQ item deleted successfully",
      result,
    );
  },
);

// Get FAQ Items by FAQ ID
export const getFaqItemsByFaqId = asyncHandler(
  async (req: Request, res: Response) => {
    const { faqId } = req.params;
    const result = await faqItemService.getFaqItemsByFaqId(faqId);
    return responseHandler(
      res,
      200,
      true,
      "FAQ items fetched successfully",
      result,
    );
  },
);
