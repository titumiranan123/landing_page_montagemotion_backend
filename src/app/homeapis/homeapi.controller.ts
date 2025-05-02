import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { homeapiServices } from "./home.service";
import { responseHandler } from "../../utils/responseHandler";

export const getAllhomeData = asyncHandler(
    async (req: Request, res: Response) => {
        const {type}= req.query
      const result = await homeapiServices.advertsingService(type as string);
      return responseHandler(res, 200, true, "Fetched all header videos", result);
    }
  );