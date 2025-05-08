import { Router } from "express";
import {
  createState,
  getAllStates,
  getStateById,
  updateState,
  deleteState,
} from "./state.controller";
import auth from "../../midleware/authMidleware";
import { validate } from "../../midleware/validate";
import { StateSchema } from "./state.zod";

const router = Router();

router.post(
  "/state/",
  auth("ADMIN", "MODARATOR"),
  validate(StateSchema),
  createState,
);
router.get("/state", getAllStates);
router.get("/state/:id", getStateById);
router.patch(
  "/state/:id",
  auth("ADMIN", "MODARATOR"),
  validate(StateSchema.partial()),
  updateState,
);
router.delete("/state/:id", auth("ADMIN", "MODARATOR"), deleteState);

export default router;
