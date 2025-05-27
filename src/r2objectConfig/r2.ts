/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ListBucketsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { errorLogger, logger } from "../logger/logger";
import ApiError from "../utils/ApiError";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Upload } from "@aws-sdk/lib-storage";
export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://3baf2988ad4837c5c3396cdbe69ccf66.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: "26c72631615111ea50e406cde8e9e61b",
    secretAccessKey:
      "5c9b5fa71f05fcf252c42a49af879a1ef2c245151eeee19a5da85d1cbed93209",
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
    const fileKey = `montagemotion-${fileName}`;
    const upload = new Upload({
      client: r2Client,
      params: {
        Bucket: "montagemotion",
        Key: fileKey,
        Body: buffer,
        ContentType: contentType,
      },
    });
    await upload.done();
    return `https://pub-6a9bd81559354e09b0ca799ba12301c8.r2.dev/${fileKey}`;
  } catch (error: any) {
    errorLogger.error("R2Object Error", error);
    throw new ApiError(400, false, error.message);
  }
};

export const generatePresignedUrl = async (
  key: string,
  contentType: string,
) => {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(r2Client, command, { expiresIn: 3600 });
  return url;
};
