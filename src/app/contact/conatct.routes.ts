import { Router } from "express";
import * as contactController from "./contact.controller";
import { validate } from "../../midleware/validate";
import { contactSchema } from "./contact.zod";
import auth from "../../midleware/authMidleware";
const route = Router();

route.post(
  "/contacts",
  validate(contactSchema),
  contactController.createContact,
);
route.get(
  "/contacts",
  auth("ADMIN", "MODARATOR"),
  contactController.getAllContact,
);

route.delete(
  "/contacts/:id",
  auth("ADMIN", "MODARATOR"),
  contactController.deleteContactById,
);
//  requireRole(["ADMIN", "MODARATOR"]),
export default route;
