import { Router } from "express";
import * as headervideo from "./header.controllers";

const router = Router();

router.post("/header", headervideo.createHeaderVideo);
router.get("/header", headervideo.getAllHeaderVideos);
// router.get("/header/:id", headervideo.getHeaderVideoById);
// router.get("/header/type/:type", headervideo.getHeaderVideoByType);
// router.patch("/header/active/:id", headervideo.updateHeaderVideoActive);
// router.put("/header/:id", headervideo.updateHeaderVideo);
// router.delete("/header/:id", headervideo.deleteHeaderVideo);

export default router;
