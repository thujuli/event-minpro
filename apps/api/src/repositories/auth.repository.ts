import prisma from '@/prisma';
import { RegisterRequest, UniqueUserField } from '@/types/auth.type';
import { ErrorResponse } from '@/utils/error';

export class AuthRepository {
  static async findUserByUnique(identifier: UniqueUserField) {
    const { email, id, referralCode, username } = identifier;

    let whereCondition: any = {};
    if (!email && !id && !referralCode && !username) {
      throw new Error('At least on identifier have one property!');
    } else {
      whereCondition = { ...identifier };
    }

    return await prisma.user.findUnique({ where: whereCondition });
  }

  static async createUser(request: RegisterRequest) {
    await prisma.user.create({ data: request });
  }
}
