import { Request } from "express";
import ApiError from "../utils/ApiError";
import { uploadToR2 } from "./r2";

export const getUploadUrl = async (req: Request) => {
  if (!req.file) {
    throw new ApiError(400, false, "No file uploaded");
  }
  const fileBuffer = req.file?.buffer;
  const fileName = req.file?.originalname.replace(/\s+/g, "-").toLowerCase();
  const contentType = req.file?.mimetype;

  const fileUrl = await uploadToR2(
    fileBuffer as Buffer<ArrayBufferLike>,
    fileName as string,
    contentType as string,
  );
  return fileUrl;
};
