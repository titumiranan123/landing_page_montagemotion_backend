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
import { BlogSchema, BlogUpdateSchema } from "./blog.zod";

const router = express.Router();

router.post("/blogs", validate(BlogSchema), createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.put("/blogs/:id", validate(BlogUpdateSchema), updateBlog);
router.patch("/blogs/positions", updateBlogPosition);
router.delete("/blogs/:id", deleteBlog);

export default router;
