import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { stateService } from "./state.services";
import { responseHandler } from "../../utils/responseHandler";

export const createState = asyncHandler(async (req: Request, res: Response) => {
  const result = await stateService.createState(req.body);
  return responseHandler(res, 201, true, "State created", result);
});

export const getAllStates = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await stateService.getAllStates(req.query);
    return responseHandler(res, 200, true, "All states fetched", result);
  },
);

export const getStateById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await stateService.getStateById(req.params.id);
    if (!result) {
      return responseHandler(res, 404, false, "State not found");
    }
    return responseHandler(res, 200, true, "State found", result);
  },
);

export const updateState = asyncHandler(async (req: Request, res: Response) => {
  const result = await stateService.updateState(req.params.id, req.body);
  return responseHandler(res, 200, true, "State updated", result);
});

export const deleteState = asyncHandler(async (req: Request, res: Response) => {
  const result = await stateService.deleteState(req.params.id);
  return responseHandler(res, 200, true, "State deleted", result);
});
