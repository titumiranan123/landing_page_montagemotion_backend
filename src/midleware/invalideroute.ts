import { NextFunction, Request, Response } from "express";

export const invalidateRoute = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested route does not exist",
    path: req.path,
  });
  next();
};
