import { Router } from "express";
import * as headervideo from "./header.controllers"
const route = Router();

route.get("/header",headervideo.getAllHeaderVideo);
route.post("/header",headervideo.createHeaderVideo);
route.get("/header/:id",headervideo.getHeaderVideoById);
route.put("/header/:id",headervideo.updateHeadervideoById);
route.delete("/header/:id");

export default route;
