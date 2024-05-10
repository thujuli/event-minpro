import prisma from '@/prisma';
import { RegisterRequest } from '@/types/auth.type';
import { UniqueUserField, UserEventQuery } from '@/types/user.type';

export class UserRepository {
  static async findUserByUnique(identifier: UniqueUserField) {
    const { email, id, referralCode, username } = identifier;

    let whereCondition: any = {};
    if (!email && !id && !referralCode && !username) {
      throw new Error('At least on identifier have one property!');
    } else {
      whereCondition = { ...identifier };
    }

    return await prisma.user.findUnique({
      where: whereCondition,
      include: { point: true },
    });
  }

  static async createUser(request: RegisterRequest) {
    return await prisma.user.create({ data: request });
  }

  static async getUserEvents(id: number, query: UserEventQuery) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        events: {
          include: { category: true, location: true },
          where: { name: { contains: query.name } },
          skip: (Number(query.page) - 1) * Number(query.limit),
          take: Number(query.limit),
          orderBy: { [query.sort_by!]: query.order_by },
        },
      },
    });
  }

  static async getAllUserEvents(id: number, query: UserEventQuery) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        events: {
          where: { name: { contains: query.name } },
          select: { id: true },
        },
      },
    });
  }

  static async getUserProfile(id: number) {
    const res = await prisma.user.findUnique({
      where: { id: id },
      include: {
        vouchers: true,
        point: true,
      },
    });
    return res;
  }
}
