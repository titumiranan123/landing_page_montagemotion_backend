import { Router } from "express";
import {
  createUser,
  deleteUser,
  handleAllUser,
  localLogin,
  makeAdmin,
  verifyUser,
} from "./auth.controllers";
import { validate } from "../../midleware/validate";
import { authSchema } from "./auth.zod";
import { requireRole } from "../../utils/requireRole";
const router = Router();

router.post("/register", validate(authSchema), createUser);
router.post("/verify", verifyUser);
router.get("/allusers", handleAllUser);
router.post("/login", localLogin);
router.put("/user/:id", requireRole(["ADMIN"]), makeAdmin);
router.delete("/user/:id", requireRole(["ADMIN", "MODARATOR"]), deleteUser);

export default router;
