/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { errorLogger } from "../logger/logger";
// import ApiError from "../utils/ApiError";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      errorLogger.error(error);
      next(error);
      // throw new ApiError(400, false, error.message);
    }
  };
