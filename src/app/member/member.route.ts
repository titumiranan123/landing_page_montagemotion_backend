import { Router } from "express";
import { MemberController } from "./member.controller";
import { validate } from "../../midleware/validate";
import { memberProfileSchema } from "./member.zod";

const memberRoute = Router();

memberRoute.post(
  "/members",
  validate(memberProfileSchema),
  MemberController.create,
);
memberRoute.get("/members", MemberController.getAll); // optional ?role=Team Member
memberRoute.get("/members/:id", MemberController.getMemberById);
memberRoute.put("/members/:id", MemberController.update);
memberRoute.delete("/members/:id", MemberController.remove);
memberRoute.patch("/members/positions", MemberController.updatePosition); // batch position update

export default memberRoute;
