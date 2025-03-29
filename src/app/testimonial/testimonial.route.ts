import { Router } from "express";
import {
  createTestimonial,
  getAllTestimonial,
  getTestimonialById,
  updateTestimonialposition,
} from "./testimonial.controller";

const route = Router();

route.post("/testimonial", createTestimonial);
route.get("/testimonial", getAllTestimonial);
route.get("/testimonial/:id", getTestimonialById);
route.put("/testimonial", updateTestimonialposition);
route.put("/testimonial/:id");
route.delete("/testimonial/:id");

export default route;
