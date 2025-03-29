import { Router } from "express";

const route = Router();

route.get("/faq");
route.post("/faq");
route.get("/faq/:id");
route.put("/faq/:id");
route.delete("/faq/:id");

export default route;
