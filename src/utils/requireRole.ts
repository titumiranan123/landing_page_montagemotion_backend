/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import { errorLogger } from "../logger/logger";
import ApiError from "./ApiError";

import { jwtHelpers } from "../midleware/jwtHelper";
import config from "../config/index";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return res.status(401).send({
          success: false,
          message: "You are not authorized",
        });
      }

      const token = authorizationHeader.split(" ")[1];
      if (!token) {
        return res.status(401).send({
          success: false,
          message: "You are not authorized",
        });
      }

      let verifiedUser = null;
      try {
        verifiedUser = jwtHelpers.verifyToken(
          token,
          config.jwt_secret as Secret,
        );
      } catch (error) {
        errorLogger.error(error);
        return res.status(401).send({
          success: false,
          message: "You are not authorized",
        });
      }

      if (!verifiedUser) {
        return res.status(401).send({
          success: false,
          message: "You are not authorized",
        });
      }

      (req as any).user = verifiedUser;
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(
          403,
          false,
          "Access denied due to insufficient permissions",
        );
      }

      next();
    } catch (error) {
      next(
        new ApiError(401, false, (error as Error)?.message || "Unauthorized"),
      );
    }
  };

export default auth;
