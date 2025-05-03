/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { CampaignService } from "./campaign.services";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";

export const CampaignController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const result = await CampaignService.create(req.body);
    return responseHandler(res, 201, true, "Campaign created", result);
  }),

  getAll: asyncHandler(async (_req: Request, res: Response) => {
    const result = await CampaignService.getAll();
    return responseHandler(res, 200, true, "All campaigns fetched", result);
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const result = await CampaignService.getById(req.params.id);
    if (!result) return responseHandler(res, 404, false, "Campaign not found");
    return responseHandler(res, 200, true, "Campaign fetched", result);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const result = await CampaignService.update(req.params.id, req.body);
    return responseHandler(res, 200, true, "Campaign updated", result);
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    const result = await CampaignService.delete(req.params.id);
    if (!result) return responseHandler(res, 404, false, "Campaign not found");
    return responseHandler(res, 200, true, "Campaign deleted", result);
  }),

  updateStatusByStatus: asyncHandler(async (req: Request, res: Response) => {
    const { type, value } = req.body; // { type: 'is_rejected', value: true }

    if (!["is_read", "is_marked", "is_rejected"].includes(type)) {
      return responseHandler(res, 400, false, "Invalid status type");
    }

    const result = await CampaignService.updateStatus(
      req.params.id,
      type as any,
      value,
    );
    return responseHandler(res, 200, true, "Campaign status updated", result);
  }),
};
