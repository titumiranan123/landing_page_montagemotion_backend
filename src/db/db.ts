import { Pool } from "pg";
import config from "../config";
import { errorLogger, logger } from "../logger/logger";
export const db = new Pool({
  host: config.db_hostname,
  port: 5432,
  user: config.db_user,
  password: config.db_password,
  database: config.db_name,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

db.on("error", (err) => {
  errorLogger.error(err);
  reconnect();
});
logger.info("📦 Connected to PostgreSQL");
const reconnect = (): void => {
  setTimeout(() => {
    db.connect().catch((err) => {
      errorLogger.error("reconnect failed", err);
    });
  }, 5000);
};
process.on("SIGINT", async () => {
  if (db) {
    await db.end();
    logger.info("🔌 PostgreSQL connection closed.");
  }
  process.exit(0);
});
