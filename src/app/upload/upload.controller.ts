import { Request, Response, NextFunction } from "express";
import ApiError from "../../utils/ApiError";
import { uploadToR2 } from "../../r2objectConfig/r2";

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new ApiError(400, false, "No file uploaded");
    }
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const contentType = req.file.mimetype;
    const fileUrl = await uploadToR2(fileBuffer, fileName, contentType);
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      url: fileUrl ,
    });
  } catch (error) {
    next(error);
  }
};
