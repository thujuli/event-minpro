import { z, ZodType } from 'zod';

export class AuthValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(4),
    isAdmin: z.boolean(),
    referralCode: z.string().min(4).optional(),
  });
}
