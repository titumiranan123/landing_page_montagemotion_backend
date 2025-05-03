/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";
import { jwtHelpers } from "./jwtHelper";
import config from "../config";
import { errorLogger } from "../logger/logger";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        throw new ApiError(401, false, "You are not authorized");
      }

      const token = authorization.split(" ")[1];
      if (!token) {
        throw new ApiError(401, false, "You are not authorized");
      }

      let verifiedUser: any = null;
      try {
        verifiedUser = jwtHelpers.verifyToken(
          token,
          config.jwt_secret as string,
        );
      } catch (error) {
        errorLogger.error(error);
        throw new ApiError(401, false, "Invalid or expired token");
      }

      if (!verifiedUser) {
        throw new ApiError(401, false, "User not found");
      }

      (req as any).user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(403, false, "Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
