const { z } = require("zod");

const noteSchema = z.object({
  title: z
    .string()
    .trim()
    .nonempty("Required.")
    .min(3, "At least 3 characters")
    .max(30, "At most 30 characters"),
  content: z
    .string()
    .trim()
    .nonempty("Required.")
    .min(3, "At least 3 characters")
    .max(1000, "At most 1000 characters"),
  color: z.enum(noteColors).default("#e8e9eb"),
  category: z.enum(categoryOptions).default("OTHER"),
});

export default noteSchema;
