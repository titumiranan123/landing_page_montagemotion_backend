import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECREATE,
  node_env: process.env.NODE_ENV,
  r2accesskeyId: process.env.R2_ACCESS_KEY_ID,
  r2secretaccesskey: process.env.R2_SECRET_ACCESS_KEY,
  r2endpoint: process.env.R2_ENDPOINT,
  r2accountid: process.env.R2_ACCOUNT_ID,
  db_hostname: process.env.DB_HOST_NAME,
  db_port: process.env.DB_PORT,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
};
