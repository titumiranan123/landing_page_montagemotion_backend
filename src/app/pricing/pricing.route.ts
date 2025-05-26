import { Router } from "express";
import {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  addFeature,
  updateFeature,
  deleteFeature,
  updatePackagePosition,
  updateFeauterPosition,
} from "./pricing.controller";
import auth from "../../midleware/authMidleware";
const router = Router();
// Package routes
router.post("/pricing", createPackage);
router.get("/pricing", getAllPackages);
router.get("/pricing/:id", getPackageById);
router.patch("/pricing/:id", updatePackage);
router.put("/pricing/", updatePackagePosition);
router.delete("/pricing/:id", deletePackage);

// Feature routes
router.post(
  "/pricing/:packageId/feature",
  auth("ADMIN", "MODARATOR"),
  addFeature,
); // Add single feature to a package
router.patch(
  "/pricing/feature/:featureId",
  auth("ADMIN", "MODARATOR"),
  updateFeature,
); // Update single feature by ID
router.put(
  "/pricing/feature/:packageId",
  auth("ADMIN", "MODARATOR"),
  updateFeauterPosition,
); // Update single feature by ID
router.delete(
  "/pricing/feature/:featureId",
  auth("ADMIN", "MODARATOR"),
  deleteFeature,
); // Delete single feature by ID
export default router;
