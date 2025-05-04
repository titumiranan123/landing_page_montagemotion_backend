import express from "express";
import { testimonialController } from "./testimonial.controller";
import { testimonialSchema } from "./testimonial.zod";
import { validate } from "../../midleware/validate";

const router = express.Router();

router.post(
  "/testimonials/",
  validate(testimonialSchema),
  testimonialController.create,
);
router.get("/testimonials/", testimonialController.getAll);
router.get("/testimonials/:id", testimonialController.getById);
router.patch(
  "/testimonials/update-positions",
  testimonialController.updatePositions,
);
router.delete("/testimonials/:id", testimonialController.remove);
router.put(
  "/testimonials/:id",
  validate(testimonialSchema.partial()),
  testimonialController.update,
);

export default router;
