import { query } from "winston";
import { db } from "../../db/db";
import { IPackage } from "./pricing.interface";

export const packageService = {
  async createPackage(data: IPackage) {
    const result = await db.query(
      `INSERT INTO packages (name, price, duration, delivery_days, revisions, type)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        data.name,
        data.price,
        data.duration,
        data.delivery_days,
        data.revisions,
        data.type,
      ]
    );

    const packageId = result.rows[0].id;

    for (const feature of data.features) {
      await db.query(
        `INSERT INTO package_features (package_id, feature, isActive) VALUES ($1, $2, $3)`,
        [packageId, feature.feature, feature.isActive]
      );
    }

    return result.rows[0];
  },

  async getAllPackages(filter?: { type?: string; id?: string }) {
    let baseQuery = `SELECT * FROM packages`;
    let conditions: string[] = [];
    const values: string[] = [];

    if (filter?.type) {
      values.push(filter.type);
      conditions.push(`type = $${values.length}`);
    }
    if (filter?.id) {
      values.push(filter.id);
      conditions.push(`id = $${values.length}`);
    }
    if (conditions.length > 0) {
      baseQuery += ` WHERE ` + conditions.join();
    }
    const pkgRes = await db.query(baseQuery, values);

    for (const pkg of pkgRes.rows) {
      const featureRes = await db.query(
        `SELECT feature, isActive FROM package_features WHERE package_id = $1`,
        [pkg.id]
      );
      pkg.features = featureRes.rows;
    }

    return pkgRes.rows;
  },

  async getPackageById(id: string) {
    const res = await db.query(`SELECT * FROM packages WHERE id = $1`, [id]);
    if (!res.rowCount) throw new Error("Package not found");

    const features = await db.query(
      `SELECT feature, isActive FROM package_features WHERE package_id = $1`,
      [id]
    );

    return { ...res.rows[0], features: features.rows };
  },

  async updatePackage(id: string, data: Partial<IPackage>) {
    const existing = await this.getPackageById(id);

    const updated = {
      ...existing,
      ...data,
    };

    await db.query(
      `UPDATE packages 
       SET name = $1, price = $2, duration = $3, delivery_days = $4, revisions = $5, type = $6
       WHERE id = $7`,
      [
        updated.name,
        updated.price,
        updated.duration,
        updated.delivery_days,
        updated.revisions,
        updated.type,
        id,
      ]
    );

    if (data.features) {
      await db.query(`DELETE FROM package_features WHERE package_id = $1`, [
        id,
      ]);
      for (const feature of data.features) {
        await db.query(
          `INSERT INTO package_features (package_id, feature, isActive) VALUES ($1, $2, $3)`,
          [id, feature.feature, feature.isActive]
        );
      }
    }

    return this.getPackageById(id);
  },

  async deletePackage(id: string) {
    await this.getPackageById(id); // check exists
    await db.query(`DELETE FROM packages WHERE id = $1`, [id]);
    return { message: "Package deleted" };
  },
};
