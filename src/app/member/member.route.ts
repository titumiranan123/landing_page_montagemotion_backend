import { Router } from "express";
import { MemberController } from "./member.controller";
import { validate } from "../../midleware/validate";
import { memberProfileSchema } from "./member.zod";
import auth from "../../midleware/authMidleware";

const memberRoute = Router();

memberRoute.post(
  "/members",
  auth("ADMIN", "MODARATOR"),
  validate(memberProfileSchema),
  MemberController.create,
);
memberRoute.get("/members", MemberController.getAll);
memberRoute.get("/members/:id", MemberController.getMemberById);
memberRoute.put(
  "/members/:id",
  auth("ADMIN", "MODARATOR"),
  MemberController.update,
);
memberRoute.delete(
  "/members/:id",
  auth("ADMIN", "MODARATOR"),
  MemberController.remove,
);
memberRoute.patch(
  "/members/positions",
  auth("ADMIN", "MODARATOR"),
  MemberController.updatePosition,
); // batch position update

export default memberRoute;
