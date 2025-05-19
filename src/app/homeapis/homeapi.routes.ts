import { Router } from "express";
import {
  getAllAboutData,
  getAllBlogs,
  getAllhomeData,
  getSingleBlogs,
} from "./homeapi.controller";

const webRoute = Router();
webRoute.get("/website/data", getAllhomeData);
webRoute.get("/website/about", getAllAboutData);
webRoute.get("/website/blog", getAllBlogs);
webRoute.get("/website/blog/:slug", getSingleBlogs);

export default webRoute;
