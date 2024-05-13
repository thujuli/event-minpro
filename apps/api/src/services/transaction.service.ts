import prisma from '@/prisma';
import { ReviewRepository } from '@/repositories/review.repository';
import { TransactionRepository } from '@/repositories/transaction.repository';
import { CreateFeedback } from '@/types/review.type';
import { TransactionCheckout } from '@/types/transaction.type';
import { responseWithData, responseWithoutData } from '@/utils/response';
import { TransactionValidation } from '@/validations/transaction.validation';
import { Validation } from '@/validations/validation';

export class TrasactionService {
  static async getPaymentStatusWaiting(id: number, body: TransactionCheckout) {
    const waiting = Validation.validate(TransactionValidation.GET, body);

    const response = await TransactionRepository.getEventWaiting(id, waiting);

    return responseWithData(
      200,
      true,
      'success get event status waiting',
      response,
    );
  }

  static async getPaymentStatusSuccess(id: number, body: TransactionCheckout) {
    const success = Validation.validate(TransactionValidation.GET, body);

    const response = await TransactionRepository.getEventSuccess(id, success);

    return responseWithData(
      200,
      true,
      'success get event status success',
      response,
    );
  }
  static async getPaymentStatusSuccessByDate(
    id: number,
    body: TransactionCheckout,
  ) {
    const success = Validation.validate(TransactionValidation.GET, body);

    const response = await TransactionRepository.getEventSuccessByDate(
      id,
      success,
    );

    return responseWithData(
      200,
      true,
      'success get event status  By Date',
      response,
    );
  }
}
