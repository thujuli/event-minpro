import { PointRepository } from '@/repositories/point.repository';
import { UserRepository } from '@/repositories/user.repository';
import { VoucherRepository } from '@/repositories/voucher.repository';
import { RegisterRequest } from '@/types/user.type';
import { ErrorResponse } from '@/utils/error';
import { hashPassword } from '@/utils/hash';
import {
  generateReferralCode,
  generateVoucherCode,
} from '@/utils/randomGenerator';
import { responseWithoutData } from '@/utils/response';
import { AuthValidation } from '@/validations/auth.validation';
import { Validation } from '@/validations/validation';

export class AuthService {
  static async register(request: RegisterRequest) {
    const { email, isAdmin, password, username, referralCode } =
      Validation.validate(AuthValidation.REGISTER, request);

    const userByEmail = await UserRepository.findUserByUnique({ email });
    if (userByEmail) throw new ErrorResponse(400, 'Email already exists!');

    const userByUsername = await UserRepository.findUserByUnique({ username });
    if (userByUsername) {
      throw new ErrorResponse(400, 'Username already exists!');
    }

    if (!isAdmin && referralCode) {
      const userByReferralCode = await UserRepository.findUserByUnique({
        referralCode,
      });

      if (!userByReferralCode) {
        throw new ErrorResponse(400, 'Invalid referral code!');
      } else {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 3);

        await PointRepository.createPoint(userByReferralCode.id, {
          balance: 10000,
          expiryDate: currentDate,
        });

        const newUser = await UserRepository.createUser({
          email,
          isAdmin,
          username,
          password: await hashPassword(password),
          referralCode: isAdmin ? undefined : generateReferralCode(),
        });

        await VoucherRepository.createVoucher(newUser.id, {
          discount: 10,
          expiryDate: currentDate,
          maxUsage: 1,
          name: generateVoucherCode(),
        });

        return responseWithoutData(201, true, 'Registration was successful');
      }
    }

    await UserRepository.createUser({
      email,
      isAdmin,
      username,
      password: await hashPassword(password),
      referralCode: isAdmin ? undefined : generateReferralCode(),
    });

    return responseWithoutData(201, true, 'Registration was successful');
  }
}
