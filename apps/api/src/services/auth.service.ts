import { AuthRepository } from '@/repositories/auth.repository';
import { RegisterRequest } from '@/types/auth.type';
import { ErrorResponse } from '@/utils/error';
import { hashPassword } from '@/utils/hash';
import { generateReferralCode } from '@/utils/referralCode';
import { responseWithoutData } from '@/utils/response';
import { AuthValidation } from '@/validations/auth.validation';
import { Validation } from '@/validations/validation';

export class AuthService {
  static async register(request: RegisterRequest) {
    const { email, isAdmin, password, username, referralCode } =
      Validation.validate(AuthValidation.REGISTER, request);

    const userByEmail = await AuthRepository.findUserByUnique({ email });
    if (userByEmail) throw new ErrorResponse(400, 'Email already exists!');

    const userByUsername = await AuthRepository.findUserByUnique({ username });
    if (userByUsername) {
      throw new ErrorResponse(400, 'Username already exists!');
    }

    if (!isAdmin && referralCode) {
      const userByReferralCode = await AuthRepository.findUserByUnique({
        referralCode,
      });

      if (!userByReferralCode) {
        throw new ErrorResponse(400, 'Invalid referral code!');
      } else {
        // TODO: Implement add point and discount for user using the referral code
      }
    }

    await AuthRepository.createUser({
      email,
      isAdmin,
      username,
      password: await hashPassword(password),
      referralCode: generateReferralCode(),
    });

    return responseWithoutData(201, true, 'Registration was successful');
  }
}
