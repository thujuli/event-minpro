import prisma from '@/prisma';
import { EventRepository } from '@/repositories/event.repository';
import { ReviewRepository } from '@/repositories/review.repository';
import { TransactionRepository } from '@/repositories/transaction.repository';
import { UserRepository } from '@/repositories/user.repository';
import { VoucherRepository } from '@/repositories/voucher.repository';
import { CreateFeedback } from '@/types/review.type';
import { TransactionCheckout, TransactionRequest } from '@/types/transaction.type';
import { ErrorResponse } from '@/utils/error';
import { responseWithData, responseWithoutData } from '@/utils/response';
import { TransactionValidation } from '@/validations/transaction.validation';
import { Validation } from '@/validations/validation';

export class TransactionService {
  static async createTransaction(id: number, request: TransactionRequest) {
    const { eventId, seatRequests, redeemedPoints, voucherId } =
      Validation.validate(TransactionValidation.CREATE, request);

    // check event availability
    const event = await EventRepository.getEventById(eventId);
    if (!event) throw new ErrorResponse(404, 'Event not found!');

    if (seatRequests > event.limitCheckout) {
      throw new ErrorResponse(400, 'Seat requests exceeds limit checkout!');
    }

    if (event.availableSeats < seatRequests) {
      throw new ErrorResponse(400, 'Not enough seats available!');
    }

    if (new Date(event.endDate).getTime() < new Date().getTime()) {
      throw new ErrorResponse(400, 'Event has ended!');
    }

    // check voucher owned by user and event
    let voucher: any = null;
    if (voucherId) {
      voucher = await VoucherRepository.findVoucherById(voucherId);
      if (!voucher) throw new ErrorResponse(404, 'Voucher not found!');

      if (voucher.userId !== id && voucher.eventId !== eventId) {
        throw new ErrorResponse(400, 'Voucher cannot be used!');
      }

      if (
        !voucher.eventId &&
        new Date(voucher.expiryDate!).getTime() < new Date().getTime()
      ) {
        throw new ErrorResponse(400, 'Voucher has expired!');
      }

      if (voucher.usage >= voucher.maxUsage) {
        throw new ErrorResponse(400, 'Voucher has reached its limit!');
      }
    }

    // check redeemable points
    const user = await UserRepository.findUserByIdIncludePoint(id);
    if (redeemedPoints) {
      if (!user?.point) throw new ErrorResponse(400, 'User has no points!');

      if (redeemedPoints > user.point.balance) {
        throw new ErrorResponse(400, 'Redeemed points exceeds balance!');
      }

      if (new Date(user.point.expiryDate).getTime() < new Date().getTime()) {
        throw new ErrorResponse(400, 'Point has expired!');
      }
    }

    if (!event.price && (redeemedPoints || voucherId)) {
      throw new ErrorResponse(400, 'Event is free!');
    }

    // transaction for event is free
    if (!event.price) {
      await prisma.$transaction(async (tx) => {
        await tx.event.update({
          data: {
            availableSeats: event.availableSeats - seatRequests,
          },
          where: { id: event.id },
        });

        await tx.transaction.create({
          data: {
            amount: 0,
            paymentStatus: 'waiting',
            user: { connect: { id } },
            event: { connect: { id: eventId } },
          },
        });
      });
    }

    // transaction for event is not free
    await prisma.$transaction(async (tx) => {
      await tx.event.update({
        data: {
          availableSeats: event.availableSeats - seatRequests,
        },
        where: { id: event.id },
      });

      if (voucherId && redeemedPoints) {
        const amount = event.price * seatRequests;
        const totalDiscount = (amount * voucher.discount) / 100;
        const amountAfterDiscount = amount - totalDiscount;

        await tx.voucher.update({
          where: { id: voucherId },
          data: { usage: { increment: 1 } },
        });

        if (amountAfterDiscount <= redeemedPoints) {
          await tx.point.update({
            where: { id: user?.point?.id },
            data: { balance: { decrement: amountAfterDiscount } },
          });

          await tx.transaction.create({
            data: {
              amount: 0,
              paymentStatus: 'waiting',
              user: { connect: { id } },
              event: { connect: { id: eventId } },
              voucher: { connect: { id: voucherId } },
              redeemedPoints: amountAfterDiscount,
            },
          });
        } else {
          const totalAmount = amountAfterDiscount - redeemedPoints;
          await tx.point.update({
            where: { id: user?.point?.id },
            data: { balance: { decrement: redeemedPoints } },
          });

          await tx.transaction.create({
            data: {
              amount: totalAmount,
              paymentStatus: 'waiting',
              user: { connect: { id } },
              event: { connect: { id: eventId } },
              voucher: { connect: { id: voucherId } },
              redeemedPoints,
            },
          });
        }
      } else if (voucherId) {
        const amount = event.price * seatRequests;
        const totalDiscount = (amount * voucher.discount) / 100;
        const amountAfterDiscount = amount - totalDiscount;

        await tx.voucher.update({
          where: { id: voucherId },
          data: { usage: { increment: 1 } },
        });

        await tx.transaction.create({
          data: {
            amount: amountAfterDiscount,
            paymentStatus: 'waiting',
            user: { connect: { id } },
            event: { connect: { id: eventId } },
            voucher: { connect: { id: voucherId } },
          },
        });
      } else if (redeemedPoints) {
        const amount = event.price * seatRequests;

        if (amount <= redeemedPoints) {
          await tx.point.update({
            where: { id: user?.point?.id },
            data: { balance: { decrement: amount } },
          });

          await tx.transaction.create({
            data: {
              amount: 0,
              paymentStatus: 'waiting',
              user: { connect: { id } },
              event: { connect: { id: eventId } },
              redeemedPoints: amount,
            },
          });
        } else {
          const totalAmount = amount - redeemedPoints;

          await tx.point.update({
            where: { id: user?.point?.id },
            data: { balance: { decrement: redeemedPoints } },
          });

          await tx.transaction.create({
            data: {
              amount: totalAmount,
              paymentStatus: 'waiting',
              user: { connect: { id } },
              event: { connect: { id: eventId } },
              redeemedPoints,
            },
          });
        }
      } else {
        await tx.transaction.create({
          data: {
            amount: event.price * seatRequests,
            paymentStatus: 'waiting',
            user: { connect: { id } },
            event: { connect: { id: eventId } },
          },
        });
      }
    });

    return responseWithoutData(201, true, 'Transaction created!');
  }

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
