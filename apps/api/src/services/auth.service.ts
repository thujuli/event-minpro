import { SALT } from '@/config';
import { AuthRepository } from '@/repositories/auth.repository';
import { RegisterRequest } from '@/types/auth.type';
import { ErrorResponse } from '@/utils/error';
import { responseWithoutData } from '@/utils/response';
import { AuthValidation } from '@/validations/auth.validation';
import { Validation } from '@/validations/validation';
import { genSalt, hash } from 'bcrypt';

export class AuthService {
  static async register(request: RegisterRequest) {
    const registerRequest = Validation.validate(
      AuthValidation.REGISTER,
      request,
    );

    const userByEmail = await AuthRepository.findUserByEmail(
      registerRequest.email,
    );
    if (userByEmail) throw new ErrorResponse(400, 'Email already exists!');
    const userByUsername = await AuthRepository.findUserByUsername(
      registerRequest.username,
    );
    if (userByUsername) {
      throw new ErrorResponse(400, 'Username already exists!');
    }

    const generateSalt = await genSalt(10);
    const hashedPass = await hash(registerRequest.password, generateSalt);

    await AuthRepository.createUser({
      ...registerRequest,
      password: hashedPass,
    });

    return responseWithoutData(201, true, 'Registration was successful');
  }
}
