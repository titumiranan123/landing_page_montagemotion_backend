import { Request, Response } from "express";

import { responseHandler } from "../../utils/responseHandler";
import { BlogService } from "./blog.services";
import { asyncHandler } from "../../midleware/asyncHandler";

export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await BlogService.createBlog(req.body);
  if (!blog) {
    return responseHandler(res, 400, false, "Failed to create blog");
  }
  return responseHandler(res, 201, true, "Blog created successfully", blog);
});

export const getAllBlogs = asyncHandler(
  async (_req: Request, res: Response) => {
    const blogs = await BlogService.getAllBlogs();
    if (!blogs || blogs.length === 0) {
      return responseHandler(res, 200, true, "No blogs found", []);
    }
    return responseHandler(
      res,
      200,
      true,
      "Blogs retrieved successfully",
      blogs,
    );
  },
);

export const getBlogById = asyncHandler(async (req: Request, res: Response) => {
  const blog = await BlogService.getBlogById(req.params.id);
  if (!blog) {
    return responseHandler(res, 404, false, "Blog not found");
  }
  return responseHandler(res, 200, true, "Blog retrieved successfully", blog);
});

export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const updatedBlog = await BlogService.updateBlog(req.params.id, req.body);
  if (!updatedBlog) {
    return responseHandler(
      res,
      404,
      false,
      "Blog not found or failed to update",
    );
  }
  return responseHandler(
    res,
    200,
    true,
    "Blog updated successfully",
    updatedBlog,
  );
});

export const updateBlogPosition = asyncHandler(
  async (req: Request, res: Response) => {
    const updated = await BlogService.updateBlogPosition(req.body);
    if (!updated) {
      return responseHandler(res, 400, false, "Failed to update blog position");
    }
    return responseHandler(res, 200, true, "Blog position updated", updated);
  },
);

export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  const deleted = await BlogService.deleteBlog(req.params.id);
  if (!deleted) {
    return responseHandler(
      res,
      404,
      false,
      "Blog not found or already deleted",
    );
  }
  return responseHandler(res, 200, true, "Blog deleted successfully", deleted);
});
