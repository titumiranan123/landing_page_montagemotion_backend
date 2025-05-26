import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  updateBlogPosition,
} from "./blog.controller";
import { validate } from "../../midleware/validate";
import { BlogSchema } from "./blog.zod";
import auth from "../../midleware/authMidleware";

const router = express.Router();

router.post(
  "/blogs",
  auth("ADMIN", "MODARATOR"),
  validate(BlogSchema),
  createBlog,
);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.put(
  "/blogs/:id",
  auth("ADMIN", "MODARATOR"),
  validate(BlogSchema.partial()),
  updateBlog,
);
router.patch(
  "/blogs/positions",
  auth("ADMIN", "MODARATOR"),
  updateBlogPosition,
);
router.delete("/blogs/:id", auth("ADMIN", "MODARATOR"), deleteBlog);

export default router;
