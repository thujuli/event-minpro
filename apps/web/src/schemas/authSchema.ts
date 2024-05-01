import { z } from "zod";

export const participantSchema = z
  .object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string(),
    referralCode: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ParticipantSchema = z.infer<typeof participantSchema>;

export const organizerSchema = z
  .object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type OrganizerSchema = z.infer<typeof organizerSchema>;

export const signInSchema = z.object({
  identity: z.string().min(3),
  password: z.string().min(4),
});

export type SignInSchema = z.infer<typeof signInSchema>;
