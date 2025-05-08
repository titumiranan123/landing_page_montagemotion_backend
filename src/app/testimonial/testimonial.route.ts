import express from "express";
import { testimonialController } from "./testimonial.controller";
import { testimonialSchema } from "./testimonial.zod";
import { validate } from "../../midleware/validate";
import auth from "../../midleware/authMidleware";

const router = express.Router();

router.post(
  "/testimonials/",
  auth("ADMIN", "MODARATOR"),
  validate(testimonialSchema),
  testimonialController.create,
);
router.get("/testimonials", testimonialController.getAll);
router.get("/testimonials/:id", testimonialController.getById);
router.patch(
  "/testimonials/update-positions",
  auth("ADMIN", "MODARATOR"),
  testimonialController.updatePositions,
);
router.delete(
  "/testimonials/:id",
  auth("ADMIN", "MODARATOR"),
  testimonialController.remove,
);
router.put(
  "/testimonials/:id",
  auth("ADMIN", "MODARATOR"),
  validate(testimonialSchema.partial()),
  testimonialController.update,
);

export default router;
