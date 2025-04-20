import { db } from "../db/db";

export const checkUser = async (email: string): Promise<boolean> => {
  const res = await db.query(`SELECT 1 FROM users WHERE email = $1 LIMIT 1`, [
    email,
  ]);
  return Boolean(res.rowCount);
};
