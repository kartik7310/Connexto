import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().trim().min(2).max(100),
  content: z.string().min(2).max(20000),
  tags: z.array(z.string().trim().min(1)).optional().default([]),
  blogImage: z.string().url("blogImage must be a valid URL").optional(),
  publishedAt: z.coerce.date().optional()
});

export const updateBlogSchema = blogSchema.partial().transform(data => {
  if (data.tags) data.tags = [...new Set(data.tags)];
  return Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
});

