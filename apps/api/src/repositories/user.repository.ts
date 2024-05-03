import prisma from '@/prisma';
import { RegisterRequest } from '@/types/auth.type';
import { UniqueUserField } from '@/types/user.type';

export class UserRepository {
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
    return await prisma.user.create({ data: request });
  }
}
