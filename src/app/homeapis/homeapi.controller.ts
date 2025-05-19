import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { homeapiServices } from "./home.service";
import { responseHandler } from "../../utils/responseHandler";

export const getAllhomeData = asyncHandler(
  async (req: Request, res: Response) => {
    const { type } = req.query;
    const result = await homeapiServices.advertsingService(type as string);
    return responseHandler(res, 200, true, "Fetched all header videos", result);
  },
);
export const getAllAboutData = asyncHandler(
  async (req: Request, res: Response) => {
    const { cat } = req.query;

    const result = await homeapiServices.aboutService(cat as string);
    return responseHandler(res, 200, true, "Fetched all about data", result);
  },
);

export const getAllBlogs = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await homeapiServices.getAllHomeBlogs();
    return responseHandler(res, 200, true, "Blogs fetched", result);
  },
);
export const getSingleBlogs = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await homeapiServices.getSingleBlogs(req.params.slug);
    return responseHandler(res, 200, true, "Blogs fetched", result);
  },
);
