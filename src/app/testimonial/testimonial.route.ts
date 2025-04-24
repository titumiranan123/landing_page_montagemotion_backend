import { Router } from "express";
import {
  createTestimonial,
  getAllTestimonial,
  getTestimonialById,
  updateTestimonialposition,
} from "./testimonial.controller";

const route = Router();

route.post("/testimonials", createTestimonial);
route.get("/testimonials", getAllTestimonial);
route.get("/testimonials/:id", getTestimonialById);
route.put("/testimonials", updateTestimonialposition);
route.put("/testimonials/:id");
route.delete("/testimonials/:id");

export default route;
