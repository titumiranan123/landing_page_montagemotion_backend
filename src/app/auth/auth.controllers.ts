/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { authService } from "./auth.services";
import { UserLoginHistory } from "./auth.interface";
import { UAParser } from "ua-parser-js";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.createUser(req.body);
  if (result) {
    return responseHandler(
      res,
      200,
      true,
      "User account created successfully",
      result,
    );
  }
  responseHandler(
    res,
    500,
    false,
    "Unable to create user account. Please try again later.",
  );
});

export const verifyUser = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body;

  const result: any | null = await authService.verifyToken(code);

  if (result === null && result?.length === 0) {
    return responseHandler(
      res,
      400,
      false,
      "Invalid or Expired verification code",
    );
  }
  responseHandler(res, 200, true, "User verification successful");
});

export const handleAllUser = asyncHandler(
  async (_req: Request, res: Response) => {
    const alluser = await authService.allUsers();
    if (alluser) {
      return responseHandler(
        res,
        200,
        true,
        "All users retrived successfully",
        alluser,
      );
    }
    return responseHandler(res, 200, true, "Failed to fetch users", alluser);
  },
);

export const localLogin = asyncHandler(async (req: Request, res: Response) => {
  const parser = new UAParser();
  const ua: any = req.headers["user-agent"];
  parser.setUA(ua);
  const result = parser.getResult();
  const logData: Partial<UserLoginHistory> = {
    device: result.device.type as string,
    browser: result.browser.name as string,
    ip_address: req.ip as string,
    login_time: new Date(),
    location: "",
  };
  const userdata = await authService.login(req.body, logData);
  return res.status(200).json({
    success: true,
    message: "Logged in successfully",
    userdata,
  });
});

export const checkAuth = asyncHandler(async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    const info = req.user as any;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = info[0];
    return responseHandler(
      res,
      200,
      true,
      "Authenticated user retrived successfully",
      user,
    );
  }
  responseHandler(
    res,
    400,
    false,
    "You are not logged in. Please log in to continue",
  );
});

export const makeAdmin = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.makeAdmin(req.params.id);
  if (result) {
    responseHandler(res, 200, true, "User updated successfully");
    return;
  }
  responseHandler(
    res,
    200,
    true,
    "Failed to update user. Please try again later.",
  );
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.deleteUser(req.params.id);
  if (result) {
    responseHandler(res, 200, true, "User deleted successfully");
    return;
  }
  responseHandler(
    res,
    200,
    true,
    "Failed to delete user. Please try again later.",
  );
});
