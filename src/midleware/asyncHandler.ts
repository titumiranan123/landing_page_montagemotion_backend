/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { errorLogger } from "../logger/logger";

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch((error) => {
      errorLogger.error(error);
      next(error);
    });
  };
};
