import { Router } from "express";
import {
  createOrUpdateAbout,
  getAllAbouts,
  getAboutById,
  updateAbout,
  deleteAbout,
} from "./about.controller";
import auth from "../../midleware/authMidleware";

const router = Router();

router.post("/about", auth("ADMIN", "MODARATOR"), createOrUpdateAbout);

router.get("/about/", getAllAbouts);

router.get("/about/:id", getAboutById);

router.put("/about/:id", auth("ADMIN", "MODARATOR"), updateAbout);

router.delete("/about/:id", auth("ADMIN", "MODARATOR"), deleteAbout);

export default router;
