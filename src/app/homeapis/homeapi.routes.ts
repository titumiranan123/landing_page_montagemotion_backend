import { Router } from "express";
import { getAllhomeData } from "./homeapi.controller";

const webRoute = Router();
webRoute.get("/website/data", getAllhomeData);

export default webRoute;
