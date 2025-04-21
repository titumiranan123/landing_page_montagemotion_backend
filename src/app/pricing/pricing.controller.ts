import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { packageService } from "./pricing.service";
import { responseHandler } from "../../utils/responseHandler";


export const createPackage = asyncHandler(async (req: Request, res: Response) => {
  const result = await packageService.createPackage(req.body);
  return responseHandler(res, 201, true, "Package created", result);
});

export const getAllPackages = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query
  const result = await packageService.getAllPackages(query);
  return responseHandler(res, 200, true, "All packages fetched", result);
});

export const getPackageById = asyncHandler(async (req: Request, res: Response) => {
  const result = await packageService.getPackageById(req.params.id);
  return responseHandler(res, 200, true, "Package fetched", result);
});

export const updatePackage = asyncHandler(async (req: Request, res: Response) => {
  const result = await packageService.updatePackage(req.params.id, req.body);
  return responseHandler(res, 200, true, "Package updated", result);
});

export const deletePackage = asyncHandler(async (req: Request, res: Response) => {
  console.log("kjlkfjalskdj")
  const result = await packageService.deletePackage(req.params.id);
  return responseHandler(res, 200, true, "Package deleted", result);
});
