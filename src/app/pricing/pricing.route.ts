import { Router } from "express";

const route = Router();

route.get("/pricing");
route.post("/pricing");
route.get("/pricing/:id");
route.put("/pricing/:id");
route.delete("/pricing/:id");

export default route;
