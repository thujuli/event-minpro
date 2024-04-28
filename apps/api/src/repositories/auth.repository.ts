import prisma from '@/prisma';
import { RegisterRequest } from '@/types/auth.type';

export class AuthRepository {
  static async findUserByUsername(username: string) {
    return await prisma.user.findUnique({ where: { username } });
  }

  static async findUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  static async createUser(request: RegisterRequest) {
    await prisma.user.create({ data: request });
  }
}
