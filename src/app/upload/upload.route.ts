import express from "express";
import upload from "../../r2objectConfig/multerupload";
import { uploadFile, uploadFiles } from "./upload.controller";
import auth from "../../midleware/authMidleware";

const router = express.Router();

router.post(
  "/upload",
  auth("ADMIN", "MODARATOR"),
  upload.single("file"),
  uploadFile,
);
router.post("/upload-video", auth("ADMIN", "MODARATOR"), uploadFiles);

export default router;
