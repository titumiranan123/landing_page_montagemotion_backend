/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import ApiError from "../utils/ApiError";

export const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages: { path: string | number; message: string }[] = [];
  const stack = err.stack;

  // Check for custom ApiError first
  if (err instanceof ApiError) {
    // Custom error handling for ApiError
    res.status(err.statusCode).json({
      success: err.status,
      message: err.errorMessage,
      errorMessages: err.errorMessage ? [{ message: err.errorMessage }] : [],
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
    return;
  }

  // Handle ZodError
  else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation error";
    errorMessages = err.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));
  }

  // Handle generic Error
  else if (err instanceof Error) {
    message = err.message;
    errorMessages = [{ path: "", message: err.message }];
  }

  // Send response for other unhandled errors
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: process.env.NODE_ENV === "production" ? null : stack,
  });
};
