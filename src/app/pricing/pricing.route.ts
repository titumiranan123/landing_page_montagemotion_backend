import { Router } from "express";
import * as pricingController from "./pricing.controller"
const route = Router();

route.post("/pricing",pricingController.createPackage);
route.get("/pricing",pricingController.getAllPackages);
route.get("/pricing/:id",pricingController.getPackageById);
route.patch("/pricing/:id",pricingController.updatePackage);
route.delete("/pricing/:id",pricingController.deletePackage);

export default route;
