import { Router } from "express";
import { CampaignController } from "./campaign.controller";

const campaignRoutes = Router();

campaignRoutes.post("/campaigns", CampaignController.create);
campaignRoutes.get("/campaigns", CampaignController.getAll);
campaignRoutes.get("/campaigns/:id", CampaignController.getById);
campaignRoutes.put("/campaigns/:id", CampaignController.update);
campaignRoutes.delete("/campaigns/:id", CampaignController.remove);

// ✅ Extra route to update status
campaignRoutes.patch(
  "/campaigns/:id/status",
  CampaignController.updateStatusByStatus,
);

export default campaignRoutes;
