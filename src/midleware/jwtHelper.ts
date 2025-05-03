import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { errorLogger } from "../logger/logger";

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    errorLogger.error(error);
    throw new Error("Invalid token");
  }
};

export const jwtHelpers = {
  verifyToken,
};
