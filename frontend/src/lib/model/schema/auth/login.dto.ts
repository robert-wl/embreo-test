import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username must be at least 1 characters").max(50, "Username must be at most 50 characters"),
  password: z.string().min(1, "Password must be at least 1 characters").max(50, "Password must be at most 50 characters"),
});

export type LoginDTO = z.infer<typeof loginSchema>;
