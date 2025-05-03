/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../db/db";

interface FeatureInput {
  feature: string;
  is_present: boolean;
  is_active: boolean;
  position: number;
}

export const packageFeatureService = {
  async addFeature(packageId: string, feature: FeatureInput) {
    const positionResult = await db.query(
      `SELECT MAX(position) as max FROM package_features WHERE package_id = $1 `,
      [packageId],
    );
    const lastPosition = positionResult.rows[0].max || 0;
    const newPosition = lastPosition + 1;
    await db.query(
      `INSERT INTO package_features (package_id, feature, is_present, is_active, position) 
       VALUES ($1, $2, $3, $4, $5)`,
      [
        packageId,
        feature.feature,
        feature.is_present,
        feature.is_active,
        newPosition,
      ],
    );
  },
  async updateFeature(featureId: string, feature: Partial<FeatureInput>) {
    const keys = Object.keys(feature);
    const values = Object.values(feature);

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    if (!setClause) return;

    await db.query(
      `UPDATE package_features SET ${setClause} WHERE id = $${keys.length + 1}`,
      [...values, featureId],
    );
  },
  async deleteFeature(featureId: string) {
    await db.query(`DELETE FROM package_features WHERE id = $1`, [featureId]);
  },
  async getFeaturesByPackageId(packageId: string) {
    const res = await db.query(
      `SELECT id, feature, is_present, is_active, position FROM package_features WHERE package_id = $1 AND is_active=true ORDER BY position ASC`,
      [packageId],
    );
    return res.rows;
  },
  async replaceAllFeatures(packageId: string, features: FeatureInput[]) {
    await db.query(`DELETE FROM package_features WHERE package_id = $1`, [
      packageId,
    ]);

    for (const feature of features) {
      await this.addFeature(packageId, feature);
    }
  },
  async updatFeaturePosition(
    packageId: string,
    features: { id: string; position: number }[],
  ) {
    const updates: Promise<any>[] = [];
    for (const feat of features) {
      const existing = await db.query(
        `SELECT position FROM package_features WHERE id = $1 AND package_id = $2`,
        [feat.id, packageId],
      );
      const currentPosition = existing.rows[0]?.position;
      if (currentPosition !== feat.position) {
        const updateQuery = db.query(
          `UPDATE package_features SET position = $1 WHERE id = $2`,
          [feat.position, feat.id],
        );
        updates.push(updateQuery);
      }
    }
  },
};
