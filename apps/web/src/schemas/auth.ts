import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string(),
    referralCode: z.string().min(6).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  identity: z.string().min(3),
  password: z.string().min(4),
});

export type SignInSchema = z.infer<typeof signInSchema>;
