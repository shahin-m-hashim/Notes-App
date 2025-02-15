import { z } from "zod";

const categoryOptions = ["PERSONAL", "WORK", "STUDY", "OTHER"];

export const noteSchema = z
  .object({
    pinned: z.boolean().default(false),
    archived: z.boolean().default(false),
    title: z.string().trim().min(3).max(30),
    content: z.string().trim().min(3).max(1000),
    category: z.enum(categoryOptions).default("OTHER"),
  })
  .strict();

export const noteQuerySchema = z
  .object({
    page: z.number().int().positive().default(1),
    category: z.enum(categoryOptions).optional(),
    search: z.string().trim().max(100).default(""),
    limit: z.number().int().positive().default(10),
  })
  .strict();
