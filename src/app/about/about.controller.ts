import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { aboutService } from "./about.service";

// Create or update about section (only one row allowed)
export const createOrUpdateAbout = asyncHandler(async (req: Request, res: Response) => {
  const result = await aboutService.createOrUpdateAbout(req.body);
  return responseHandler(res, 200, true, "About content saved successfully", result);
});

export const getAllAbouts = asyncHandler(async (_req: Request, res: Response) => {
  const result = await aboutService.getAllAbouts();
  return responseHandler(res, 200, true, "All abouts fetched", result);
});

export const getAboutById = asyncHandler(async (req: Request, res: Response) => {
  const result = await aboutService.getAboutById(req.params.id);
  if (!result) return responseHandler(res, 404, false, "About not found");
  return responseHandler(res, 200, true, "About fetched", result);
});

export const updateAbout = asyncHandler(async (req: Request, res: Response) => {
  const result = await aboutService.updateAbout(req.params.id, req.body);
  return responseHandler(res, 200, true, "About updated", result);
});

export const deleteAbout = asyncHandler(async (req: Request, res: Response) => {
  const result = await aboutService.deleteAbout(req.params.id);
  if (!result) return responseHandler(res, 404, false, "About not found");
  return responseHandler(res, 200, true, "About deleted", result);
});
