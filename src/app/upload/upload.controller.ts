import { Request, Response, NextFunction } from "express";
import ApiError from "../../utils/ApiError";
import { generatePresignedUrl, uploadToR2 } from "../../r2objectConfig/r2";
import { errorLogger } from "../../logger/logger";

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      throw new ApiError(400, false, "No file uploaded");
    }
    const fileBuffer = req.file.buffer;
    const sanitizedFileName = req.file.originalname.replace(/\s+/g, "_");
    const contentType = req.file.mimetype;
    const fileUrl = await uploadToR2(
      fileBuffer,
      sanitizedFileName,
      contentType,
    );
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      url: fileUrl,
    });
  } catch (error) {
    next(error);
  }
};
export const uploadFiles = async (req: Request, res: Response) => {
  const { fileName, contentType } = req.body;
  if (!fileName || !contentType) {
    res.status(400).json({ message: "Missing parameters" });
  }

  try {
    const sanitizedKey = fileName.replace(/\s+/g, "-").toLowerCase();
    const url = await generatePresignedUrl(sanitizedKey, contentType);
    res.json({ uploadUrl: url, key: sanitizedKey });
  } catch (error) {
    errorLogger.error("Error generating presigned URL", error);
    res.status(500).json({ message: "Failed to generate presigned URL" });
  }
};
