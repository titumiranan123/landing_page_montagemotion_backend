import { Router } from "express";
import {
  createState,
  getAllStates,
  getStateById,
  updateState,
  deleteState,
} from "./state.controller";

const router = Router();

router.post("/state/", createState);
router.get("/state", getAllStates);
router.get("/state/:id", getStateById);
router.patch("/state/:id", updateState);
router.delete("/state/:id", deleteState);

export default router;
