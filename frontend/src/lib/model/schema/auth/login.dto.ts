import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(50, "Username must be at most 50 characters"),
  password: z.string().min(8, "Password must be at least 8 characters").max(50, "Password must be at most 50 characters"),
});

export type LoginDTO = z.infer<typeof loginSchema>;
