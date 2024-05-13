import prisma from '@/prisma';
import { CreateVoucher } from '@/types/voucher.type';

export class VoucherRepository {
  static async createVoucher(id: number, data: CreateVoucher) {
<<<<<<< HEAD

=======
>>>>>>> main
    return await prisma.voucher.create({
      data: {
        discount: data.discount,
        maxUsage: data.maxUsage,
        name: data.name,
        event: { connect: { id: data.eventId } },
        user: { connect: { id } },
      },
    });
  }

  static async findVoucherById(id: number) {
    return await prisma.voucher.findUnique({
      where: { id },
    });
  }
}
