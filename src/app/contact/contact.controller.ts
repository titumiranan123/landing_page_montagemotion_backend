import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { contactService } from "./contact.services";

export const createContact = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await contactService.createContact(req.body);

    if (result) {
      return responseHandler(
        res,
        201,
        true,
        "Message send successfully",
        result,
      );
    }

    return responseHandler(res, 400, false, "Message send failed");
  },
);

export const getAllContact = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const result = await contactService.getAllContact();
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "Contact retrived successfully",
        result,
      );
    }
    responseHandler(res, 400, false, "Contact retrived failed", result);
  },
);
export const deleteContactById = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await contactService.deleteContactById(req.params.id);
    if (result) {
      return responseHandler(
        res,
        200,
        true,
        "Contact deleted successfully",
        result,
      );
    }
    responseHandler(res, 400, false, "Contact deleted failed", result);
  },
);
