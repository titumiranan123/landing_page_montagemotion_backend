import { db } from "../../db/db";
import { packageFeatureService } from "./package.service";
import { IPackage } from "./pricing.interface";

export const packageService = {
  async createPackage(data: IPackage) {
    const positionResult = await db.query(
      `SELECT MAX(position) as max FROM packages`
    );
    const lastPosition = positionResult.rows[0].max || 0;
    const newPosition = lastPosition + 1;
    const result = await db.query(
      `INSERT INTO packages (is_visible, name, title, description, currency, price, unit, pricing_type, note, purchase_link, type,position)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12) RETURNING *`,
      [
        data.is_visible,
        data.name,
        data.title,
        data.description,
        data.currency,
        data.price,
        data.unit,
        data.pricing_type,
        data.note,
        data.purchase_link,
        data.type,
        newPosition,
      ]
    );

    const packageId = result.rows[0].id;

    // Insert features
    if (data.features) {
      for (const feature of data.features) {
        await packageFeatureService.addFeature(packageId, {
          ...feature,
          is_present: feature.is_present === "true",
        });
      }
    }

    return result.rows[0];
  },

  async getAllPackages(filter?: { type?: string; id?: string }) {
    let baseQuery = `SELECT * FROM packages  WHERE is_visible = true ORDER BY position ASC`;
    let conditions: string[] = [];
    const values: any[] = [];

    if (filter?.type) {
      values.push(filter.type);
      conditions.push(`type = $${values.length}`);
    }
    if (filter?.id) {
      values.push(filter.id);
      conditions.push(`id = $${values.length}`);
    }
    if (conditions.length > 0) {
      baseQuery += ` WHERE ` + conditions.join(" AND ");
    }

    const pkgRes = await db.query(baseQuery, values);

    for (const pkg of pkgRes.rows) {
      pkg.features = await packageFeatureService.getFeaturesByPackageId(pkg.id);
    }

    return pkgRes.rows;
  },

  async getPackageById(id: string) {
    const res = await db.query(`SELECT * FROM packages WHERE id = $1`, [id]);
    if (!res.rowCount) throw new Error("Package not found");

    const features = await packageFeatureService.getFeaturesByPackageId(id);
    return { ...res.rows[0], features };
  },

  async updatePackage(id: string, data: Partial<IPackage>) {
    const existing = await this.getPackageById(id);
    const updated = { ...existing, ...data };

    await db.query(
      `UPDATE packages 
       SET name = $1, price = $2, title = $3, description = $4, note = $5, type = $6
       WHERE id = $7`,
      [
        updated.name,
        updated.price,
        updated.title,
        updated.description,
        updated.note,
        updated.type,
        id,
      ]
    );

    // Optional: Update feature list
    if (data.features) {
      await packageFeatureService.replaceAllFeatures(
        id,
        data.features.map((feature) => ({
          ...feature,
          is_present: feature.is_present === "true",
        }))
      );
    }

    return this.getPackageById(id);
  },

  async deletePackage(id: string) {
    await this.getPackageById(id); // check exists
    await db.query(`DELETE FROM packages WHERE id = $1`, [id]);
    return { message: "Package deleted" };
  },
  async updatPackagePosition( packages: { id: string; position: number }[]
  ) {
  
    const updates: Promise<any>[] = [];
    for (const pkg of packages) {
      const existing = await db.query(
        `SELECT position FROM packages WHERE id = $1 `,
        [pkg.id]
      );
      
      const currentPosition = existing.rows[0]?.position;
      console.log(currentPosition,pkg.position)
      if (currentPosition !== pkg.position) {
        const updateQuery = db.query(
          `UPDATE packages SET position = $1 WHERE id = $2`,
          [pkg.position, pkg.id]
        );
        updates.push(updateQuery);
      }
    }
  },
};
