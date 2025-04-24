import { Router } from "express";
import * as videoController from "./work.contrller";
import auth from "../../midleware/authMidleware";
import { validate } from "../../midleware/validate";
import { workSchema } from "./wok.zod";
const route = Router();

route.post(
  "/works",
  auth("ADMIN"),
  validate(workSchema),
  videoController.createVideo
);
route.get("/works", videoController.getAllVideos);
route.put("/works", videoController.updateVideosposition);
route.get("/works/:id", videoController.getVideosById);
route.put("/works/:id", videoController.updateVideosById);
route.delete("/works/:id", videoController.updateVideosposition);

export default route;
