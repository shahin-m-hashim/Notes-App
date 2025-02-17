import { z } from "zod";

const categoryOptions = ["ALL", "PERSONAL", "WORK", "STUDY", "OTHER"];

const noteColors = ["#fec971", "#fe9b72", "#b693fd", "#e4ef90", "#00d4fe"];

export const noteSchema = z
  .object({
    pinned: z.boolean().default(false),
    archived: z.boolean().default(false),
    title: z.string().trim().min(3).max(30),
    content: z.string().trim().min(3).max(1000),
    color: z.enum(noteColors).default("#e8e9eb"),
    category: z.enum(categoryOptions).default("OTHER"),
  })
  .strict();

export const noteQuerySchema = z
  .object({
    search: z.string().trim().max(100).default(""),
    category: z.enum(categoryOptions).default("ALL"),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
  })
  .strict();
