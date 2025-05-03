/* eslint-disable @typescript-eslint/no-explicit-any */
import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf, prettyPrint } = format;
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";
const myFormat = printf(({ level, message, label, timestamp }: any) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minite = date.getMinutes();

  return `${date.toDateString()} ${hours}:${minite} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    label({ label: "landingpage" }),
    timestamp(),
    prettyPrint(),
    myFormat,
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "success",
        "success-%DATE%.log",
      ),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});
const errorLogger = createLogger({
  level: "error",
  format: combine(
    label({ label: "landingpage" }),
    timestamp(),
    prettyPrint(),
    myFormat,
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "error",
        "error-%DATE%.log",
      ),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export { logger, errorLogger };
