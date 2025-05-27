import { Router } from "express";
import { createOrUpdateAbout, getAllAbouts } from "./about.controller";
import auth from "../../midleware/authMidleware";
import { validate } from "../../midleware/validate";
import { aboutSchema } from "./about.zod";

const router = Router();

router.post(
  "/about",
  auth("ADMIN", "MODARATOR"),
  validate(aboutSchema),
  createOrUpdateAbout,
);
router.get("/about", getAllAbouts);

export default router;
