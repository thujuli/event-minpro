import { ErrorResponse } from '@/utils/error';
import { z, ZodType } from 'zod';

export class AuthValidation {
  static readonly REGISTER: ZodType = z
    .object({
      username: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(4),
      isAdmin: z.boolean(),
      referralCode: z.string().min(6).optional(),
    })
    .refine(
      (data) => {
        if (data.isAdmin && data.referralCode !== undefined) {
          throw new ErrorResponse(400, 'Admin cannot provide a referral code!');
        }
        return true;
      },
      {
        message: 'Invalid input: Admin cannot provide a referral code!',
        path: ['referralCode'],
      },
    );
}
