import { Router } from "express";
import * as videoController from "./recent.contrller"
const route = Router();

route.post("/videos",videoController.createVideo);
route.get("/videos",videoController.getAllVideos);
route.put("/videos",videoController.updateVideosposition);
route.get("/videos/:id",videoController.getVideosById);
route.put("/videos/:id",videoController.updateVideosById);
route.delete("/videos/:id",videoController.updateVideosposition);

export default route;
