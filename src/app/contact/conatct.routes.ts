import { Router } from "express";
import * as contactController from "./contact.controller";
import { validate } from "../../midleware/validate";
import { contactSchema } from "./contact.zod";
import { requireRole } from "../../utils/requireRole";
const route = Router();

route.post(
  "/contacts",
  validate(contactSchema),
  contactController.createContact,
);
route.get(
  "/contacts",
  // requireRole(["ADMIN", "MODARATOR"]),
  contactController.getAllContact,
);

route.delete(
  "/contacts/:id",
  // requireRole(["ADMIN", "MODARATOR"]),
  contactController.deleteContactById,
);
//  requireRole(["ADMIN", "MODARATOR"]),
export default route;
