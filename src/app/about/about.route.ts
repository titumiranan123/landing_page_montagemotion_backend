import { Router } from "express";
import {
  createOrUpdateAbout,
  getAllAbouts,
  getAboutById,
  updateAbout,
  deleteAbout,
} from "./about.controller";

const router = Router();

// Only one about content is allowed; this will insert or update the existing one
router.post("/about", createOrUpdateAbout);

// Get all (ideally returns only one due to the logic)
router.get("/about/", getAllAbouts);

// Get a specific about content by ID
router.get("/about/:id", getAboutById);

// Update specific about content by ID
router.put("/about/:id", updateAbout);

// Delete about content by ID
router.delete("/about/:id", deleteAbout);

export default router;
