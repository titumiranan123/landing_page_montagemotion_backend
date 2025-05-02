import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { packageService } from "./pricing.service";
import { responseHandler } from "../../utils/responseHandler";
import { packageFeatureService } from "./package.service";

// Package CRUD
export const createPackage = asyncHandler(async (req: Request, res: Response) => {
  const result = await packageService.createPackage(req.body);
  return responseHandler(res, 201, true, "Package created", result);
});

export const getAllPackages = asyncHandler(async (req: Request, res: Response) => {
  const result = await packageService.getAllPackages(req.query);
  return responseHandler(res, 200, true, "All packages fetched", result);
});

export const getPackageById = asyncHandler(async (req: Request, res: Response) => {
  const result = await packageService.getPackageById(req.params.id);
  return responseHandler(res, 200, true, "Package fetched", result);
});

export const updatePackage = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body)
  const result = await packageService.updatePackage(req.params.id, req.body);
  return responseHandler(res, 200, true, "Package updated", result);
});
export const updatePackagePosition = asyncHandler(async (req: Request, res: Response) => {
  const result = await packageService.updatPackagePosition( req.body);
  return responseHandler(res, 200, true, "Package updated", result);
});

export const deletePackage = asyncHandler(async (req: Request, res: Response) => {
  const result = await packageService.deletePackage(req.params.id);
  return responseHandler(res, 200, true, "Package deleted", result);
});

// Feature CRUD
export const addFeature = asyncHandler(async (req: Request, res: Response) => {
  const result = await packageFeatureService.addFeature(req.params.packageId, req.body);
  return responseHandler(res, 201, true, "Feature added", result);
});

export const updateFeature = asyncHandler(async (req: Request, res: Response) => {
  const result = await packageFeatureService.updateFeature(req.params.featureId, req.body);
  return responseHandler(res, 200, true, "Feature updated", result);
});
export const updateFeauterPosition = asyncHandler(async (req: Request, res: Response) => {
  const result = await packageFeatureService.updatFeaturePosition(req.params.packageId, req.body);
  return responseHandler(res, 200, true, "Feature updated", result);
});

export const deleteFeature = asyncHandler(async (req: Request, res: Response) => {
  const result = await packageFeatureService.deleteFeature(req.params.featureId);
  return responseHandler(res, 200, true, "Feature deleted", result);
});
