import { Request, Response } from "express";
import { CampaignService } from "./campaign.services";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";

export const CampaignController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const result = await CampaignService.create(req.body);
    if (!result) {
      return responseHandler(res, 400, false, "Failed to create campaign");
    }
    return responseHandler(
      res,
      201,
      true,
      "Campaign created successfully",
      result,
    );
  }),

  getAll: asyncHandler(async (_req: Request, res: Response) => {
    const result = await CampaignService.getAll();
    return responseHandler(
      res,
      200,
      true,
      "All campaigns fetched",
      result ?? [],
    );
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const result = await CampaignService.getById(req.params.id);
    if (!result) {
      return responseHandler(res, 404, false, "Campaign not found");
    }
    return responseHandler(
      res,
      200,
      true,
      "Campaign fetched successfully",
      result,
    );
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const result = await CampaignService.update(req.params.id, req.body);
    if (!result) {
      return responseHandler(
        res,
        404,
        false,
        "Campaign not found or update failed",
      );
    }
    return responseHandler(
      res,
      200,
      true,
      "Campaign updated successfully",
      result,
    );
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    const result = await CampaignService.delete(req.params.id);
    if (!result) {
      return responseHandler(
        res,
        404,
        false,
        "Campaign not found or already deleted",
      );
    }
    return responseHandler(
      res,
      200,
      true,
      "Campaign deleted successfully",
      result,
    );
  }),

  updateStatusByStatus: asyncHandler(async (req: Request, res: Response) => {
    const { type, value, rejected_message } = req.body;

    if (!["is_read", "is_marked", "is_rejected"].includes(type)) {
      return responseHandler(res, 400, false, "Invalid status type");
    }

    if (type === "is_rejected" && value === true && rejected_message) {
      await CampaignService.update(req.params.id, { rejected_message });
    }

    const result = await CampaignService.updateStatus(
      req.params.id,
      type as "is_read" | "is_marked" | "is_rejected",
      value,
    );

    if (!result) {
      return responseHandler(
        res,
        404,
        false,
        "Campaign not found or status update failed",
      );
    }

    return responseHandler(
      res,
      200,
      true,
      "Campaign status updated successfully",
      result,
    );
  }),
};
