import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { serviceService } from "./services.service";
import { responseHandler } from "../../utils/responseHandler";

// Create Service
export const createService = asyncHandler(async (req: Request, res: Response) => {
  const result = await serviceService.createService(req.body);
  return responseHandler(res, 201, true, "Service created successfully", result);
});

// Get All Services
export const getAllServices = asyncHandler(async (_req: Request, res: Response) => {
  const result = await serviceService.getAllServices();
  return responseHandler(res, 200, true, "All services fetched", result);
});

// Get Service By ID
export const getServiceById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await serviceService.getServiceById(id);
  if (!result) return responseHandler(res, 404, false, "Service not found");
  return responseHandler(res, 200, true, "Service fetched", result);
});

// Update Service
export const updateService = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await serviceService.updateService(id, req.body);
  return responseHandler(res, 200, true, "Service updated", result);
});

// Delete Service
export const deleteService = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await serviceService.deleteService(id);
  if (!result) return responseHandler(res, 404, false, "Service not found");
  return responseHandler(res, 200, true, "Service deleted", result);
});

// ✅ New Controller: Update Service Positions (Bulk reorder)
export const updateServicePositions = asyncHandler(async (req: Request, res: Response) => {
  const result = await serviceService.updateServicePositions(req.body); // expects [{id, position}]
  return responseHandler(res, 200, true, "Service positions updated", result);
});
