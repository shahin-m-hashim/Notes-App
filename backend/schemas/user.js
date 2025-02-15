import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(3)
  .max(30)
  .regex(/^(?!\d+$)[a-zA-Z0-9_]+$/);

const passwordSchema = z
  .string()
  .trim()
  .min(6)
  .max(24)
  .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/);

const emailSchema = z.string().trim().toLowerCase().nonempty().email();

export const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().trim().nonempty("Required."),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });

export const loginSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();
