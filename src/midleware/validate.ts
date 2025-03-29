import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { errorLogger } from "../logger/logger";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      errorLogger.error(error);
      return res.status(400).json({
        status: false,
        message: "Somthing went wrong.",
        errorMessage: error.message,
        stack: error,
      });
    }
  };
