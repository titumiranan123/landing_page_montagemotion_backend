import { NextFunction, Request, Response } from "express";
import { errorLogger } from "../logger/logger";

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      return fn(req, res, next);
    } catch (error) {
      errorLogger.error(error);
      next(error);
    }
  };
};
