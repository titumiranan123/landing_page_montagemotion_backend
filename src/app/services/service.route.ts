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

router.post("/service", auth("ADMIN"),validate(createServiceSchema), createService);
router.get("/service",auth("ADMIN"), getAllServices);
router.get("/service/:id", getServiceById);
router.patch("/service/:id", updateService);
router.put("/service/:id", updateServicePositions);
router.delete("/service/:id", deleteService);

export default router;
