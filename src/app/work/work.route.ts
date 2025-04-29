import { Router } from "express";
import {createVideo,
  getAllVideos,
  getAllVideosForWebsite,
  getVideosById,
  updateVideosById,
  updateVideosPosition,
  deleteVideoById,} from "./work.contrller";
import auth from "../../midleware/authMidleware";
import { validate } from "../../midleware/validate";
import { VideoSchema } from "./wok.zod";

const router = Router();

router.post(
  "/works",
  // auth("ADMIN"),
  validate(VideoSchema),
  createVideo
);

router.get("/works/", getAllVideos);
router.get("/works/website", getAllVideosForWebsite);
router.get("/works/:id", getVideosById);
router.put("/works/:id", updateVideosById);
router.patch("/works/positions", updateVideosPosition);
router.delete("/works/:id", deleteVideoById);




export default router;
