import express from "express";
import upload from "../../r2objectConfig/multerupload";
import { uploadFile } from "./upload.controller";


const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);

export default router;
