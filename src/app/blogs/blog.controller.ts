import { Request, Response } from "express";
import { asyncHandler } from "../../midleware/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { BlogService } from "./blog.services";


export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const result = await BlogService.createBlog(req.body);
  return responseHandler(res, 201, true, "Blog created", result);
});

export const getAllBlogs = asyncHandler(async (_req: Request, res: Response) => {
  const result = await BlogService.getAllBlogs();
  return responseHandler(res, 200, true, "Blogs fetched", result);
});

export const getBlogById = asyncHandler(async (req: Request, res: Response) => {
  const result = await BlogService.getBlogById(req.params.id);
  if (!result) return responseHandler(res, 404, false, "Blog not found");
  return responseHandler(res, 200, true, "Blog fetched", result);
});

export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const result = await BlogService.updateBlog(req.params.id, req.body);
  return responseHandler(res, 200, true, "Blog updated", result);
});
export const updateBlogPosition = asyncHandler(async (req: Request, res: Response) => {
  const result = await BlogService.updateBlogPosition( req.body);
  return responseHandler(res, 200, true, "Blog updated", result);
});

export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  const result = await BlogService.deleteBlog(req.params.id);
  if (!result) return responseHandler(res, 404, false, "Blog not found");
  return responseHandler(res, 200, true, "Blog deleted", result);
});
