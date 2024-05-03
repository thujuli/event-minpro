import { PointRepository } from '@/repositories/point.repository';
import { UserRepository } from '@/repositories/user.repository';
import { VoucherRepository } from '@/repositories/voucher.repository';
import { Decoded, LoginRequest, RegisterRequest } from '@/types/auth.type';
import { ErrorResponse } from '@/utils/error';
import { comparePassword, hashPassword } from '@/utils/hash';
import { generateJWTToken } from '@/utils/jwt';
import {
  generateReferralCode,
  generateVoucherCode,
} from '@/utils/randomGenerator';
import { responseWithData, responseWithoutData } from '@/utils/response';
import { AuthValidation } from '@/validations/auth.validation';
import { Validation } from '@/validations/validation';

export class AuthService {
  static async register(request: RegisterRequest) {
    const { email, isAdmin, password, username, referralCode } =
      Validation.validate(AuthValidation.REGISTER, request);

    const userByUsername = await UserRepository.findUserByUnique({ username });
    if (userByUsername) {
      throw new ErrorResponse(400, 'Username already exists!');
    }

    const userByEmail = await UserRepository.findUserByUnique({ email });
    if (userByEmail) throw new ErrorResponse(400, 'Email already exists!');

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

  static async login(request: LoginRequest) {
    const { identity, password } = Validation.validate(
      AuthValidation.LOGIN,
      request,
    );

    let findUser = null;
    const userByUsername = await UserRepository.findUserByUnique({
      username: identity,
    });
    if (!userByUsername) {
      const userByEmail = await UserRepository.findUserByUnique({
        email: identity,
      });
      findUser = userByEmail;
    }

    const user = userByUsername ? userByUsername : findUser;
    if (!user) throw new ErrorResponse(404, 'Username or Email not exists!');

    const compare = await comparePassword(password, user.password);
    if (!compare) throw new ErrorResponse(401, 'Password is wrong!');

    const token = generateJWTToken({ id: user.id, isAdmin: user.isAdmin });
    return responseWithData(200, true, 'Login was successful', {
      username: user.username,
      isAdmin: user.isAdmin,
      token,
    });
  }

  static async keepLogin(decoded: Decoded) {
    const token = generateJWTToken({
      id: decoded.id,
      isAdmin: decoded.isAdmin,
    });

    const user = await UserRepository.findUserByUnique({ id: decoded.id });
    if (!user) throw new ErrorResponse(404, 'User not found!');

    return responseWithData(200, true, 'Keep login was successful', {
      username: user.username,
      isAdmin: user.isAdmin,
      token,
    });
  }
}
