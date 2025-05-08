import { Router } from "express";
import {
  createVideo,
  getAllVideos,
  getAllVideosForWebsite,
  getVideosById,
  updateVideosById,
  updateVideosPosition,
  deleteVideoById,
} from "./work.contrller";
import { validate } from "../../midleware/validate";
import { VideoSchema } from "./wok.zod";
import auth from "../../midleware/authMidleware";

const router = Router();

router.post(
  "/works",
  auth("ADMIN", "MODARATOR"),
  validate(VideoSchema),
  createVideo,
);

router.get("/works/", getAllVideos);
router.get("/works/website", getAllVideosForWebsite);
router.get("/works/:id", getVideosById);
router.post("/works/:id", auth("ADMIN", "MODARATOR"), updateVideosById);
router.patch(
  "/works/positions",
  auth("ADMIN", "MODARATOR"),
  updateVideosPosition,
);
router.delete("/works/:id", auth("ADMIN", "MODARATOR"), deleteVideoById);

export default router;
