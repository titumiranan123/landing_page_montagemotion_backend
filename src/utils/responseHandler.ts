import { Response } from "express";

export const responseHandler = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: any
) => {
  return res.status(statusCode).json({
    success: success,
    message: message,
    data: data || null,
  });
};
