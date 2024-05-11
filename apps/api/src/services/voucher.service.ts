import prisma from '@/prisma';
import { EventRepository } from '@/repositories/event.repository';
import { VoucherRepository } from '@/repositories/voucher.repository';
import { CreateVoucher } from '@/types/voucher.type';
import { ErrorResponse } from '@/utils/error';
import { responseWithoutData } from '@/utils/response';
import { Validation } from '@/validations/validation';
import { VoucherValidation } from '@/validations/voucher.validation';

export class VoucherService {
  static async createVoucher(id: number, body: CreateVoucher) {
    const voucher = Validation.validate(VoucherValidation.CREATE, body);

    const event = await EventRepository.getEventById(id);

    if (event?.userId !== id) {
      throw new ErrorResponse(400, 'The event is not yours');
    }

    await VoucherRepository.createVoucher(id, voucher);

    return responseWithoutData(201, true, 'Success create a promo event');
  }
}
