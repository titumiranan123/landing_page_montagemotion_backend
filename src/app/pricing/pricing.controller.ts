import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { packageService } from "./pricing.service";
import { responseHandler } from "../../utils/responseHandler";



export const createPackage = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {

    const result:any|null = await packageService.createPackage(req.body);

    if (result?.length>0) {
      return responseHandler(
        res,
        201,
        true,
        "Package created successfully",
        result
      );
    }

    return responseHandler(res, 400, false, "Package creation failed");
  }
);

export const getAllPackage = asyncHandler(
  async (_req: Request, res: Response, next: NextFunction) => {
    const result = await packageService.getAllPackage();
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "Package Retrive successfully",
        result
      );
    }
    responseHandler(res, 400, false, "Package Retrive failed", result);
  }
);
export const getPackageById = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await packageService.getPackageById(req.params.id);
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "HeaderVideo Retrive successfully",
        result
      );
    }
    responseHandler(res, 400, false, "Headervideo Retrive failed", result);
  }
);
export const updatePackageById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await packageService.updatePackageById(req.body,req.params.id);
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "Package update successfully",
        result
      );
    }
    responseHandler(res, 400, false, "Package update failed", result);
  }
);
export const deletePackageById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result:any|null = await packageService.deletePackageById(req.params.id);
    if (result > 0) {
      return responseHandler(
        res,
        200,
        true,
        "Package delete successfully",
        result
      );
    }
    responseHandler(res, 400, false, "Package not found", result);
  }
);

