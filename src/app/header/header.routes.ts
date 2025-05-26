import { Router } from "express";
import * as headervideo from "./header.controllers";
import auth from "../../midleware/authMidleware";
import { validate } from "../../midleware/validate";
import { HeaderSchema } from "./header.zod";

const router = Router();

router.post(
  "/header",
  auth("ADMIN", "MODARATOR"),
  validate(HeaderSchema),
  headervideo.createHeaderVideo,
);
router.get("/header", headervideo.getAllHeaderVideos);

export default router;
