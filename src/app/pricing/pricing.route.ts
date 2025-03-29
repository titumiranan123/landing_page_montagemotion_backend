import { Router } from "express";
import * as pricingController from "./pricing.controller"
const route = Router();

route.post("/pricing",pricingController.createPackage);
route.get("/pricing",pricingController.getAllPackage);
route.get("/pricing/:id",pricingController.getPackageById);
route.put("/pricing/:id");
route.delete("/pricing/:id",pricingController.deletePackageById);

export default route;
