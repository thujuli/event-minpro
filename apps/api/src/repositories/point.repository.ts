import prisma from '@/prisma';
import { CreatePoint } from '@/types/point.type';

export class PointRepository {
  static async createPoint(userId: number, data: CreatePoint) {
    return await prisma.point.create({
      data: {
        balance: data.balance,
        expiryDate: data.expiryDate,
        user: { connect: { id: userId } },
      },
    });
  }
}
