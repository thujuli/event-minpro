import prisma from '@/prisma';
import { CreateVoucher } from '@/types/voucher.type';

export class VoucherRepository {
  static async createVoucher(userId: number, data: CreateVoucher) {
    return await prisma.voucher.create({
      data: {
        discount: data.discount,
        expiryDate: data.expiryDate,
        maxUsage: data.maxUsage,
        name: data.name,

        user: { connect: { id: userId } },
      },
    });
  }
}
