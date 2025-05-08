import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  updateServicePositions,
} from "./service.controller";
import auth from "../../midleware/authMidleware";
import { validate } from "../../midleware/validate";
import { createServiceSchema } from "./service.zod";

const router = express.Router();

router.post(
  "/service",
  auth("ADMIN", "MODARATOR"),
  validate(createServiceSchema),
  createService,
);
router.get("/service", getAllServices);
router.get("/service/:id", getServiceById);
router.patch("/service/:id", auth("ADMIN", "MODARATOR"), updateService);
router.put("/service", auth("ADMIN", "MODARATOR"), updateServicePositions);
router.delete("/service/:id", auth("ADMIN", "MODARATOR"), deleteService);

export default router;
