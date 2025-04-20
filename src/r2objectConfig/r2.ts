/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import { errorLogger, logger } from "../logger/logger";
import ApiError from "../utils/ApiError";
import crypto from "crypto";
import { Upload } from "@aws-sdk/lib-storage";
export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://096322334c8d03f5e788f6e7024abeea.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: "4471145f8ff57ce629583e304e68722a",
    secretAccessKey:
      "a3fa11b7daad4a3c4390f87b76717def3859c36a9680cb6a84e9ee8682380996",
  },
});
// for health check
(async () => {
  try {
    const response = await r2Client.send(new ListBucketsCommand({}));
    logger.info("Buckets:", response.Buckets);
  } catch (error) {
    errorLogger.error("S3 Test Error:", error);
  }
})();

export const uploadToR2 = async (
  buffer: Buffer,
  fileName: string,
  contentType: string,
) => {
  try {
    const fileKey = `${crypto.randomUUID}-${fileName}`;
    const upload = new Upload({
      client: r2Client,
      params: {
        Bucket: "testdata",
        Key: fileKey,
        Body: buffer,
        ContentType: contentType,
      },
    });
    await upload.done();
    return `https://pub-ec42ff955758460994cdb2c45e5b6daa.r2.dev/${fileKey}`;
  } catch (error: any) {
    errorLogger.error("R2Object Error", error);
    throw new ApiError(400, false, error.message);
  }
};
