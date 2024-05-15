import prisma from '@/prisma';
import { EventRepository } from '@/repositories/event.repository';
import { ReviewRepository } from '@/repositories/review.repository';
import { TransactionRepository } from '@/repositories/transaction.repository';
import { UserRepository } from '@/repositories/user.repository';
import { VoucherRepository } from '@/repositories/voucher.repository';
import {
  TransactionCheckout,
  TransactionRequest,
} from '@/types/transaction.type';
import { ErrorResponse } from '@/utils/error';
import { generateTicketCode } from '@/utils/randomGenerator';
import { responseWithData, responseWithoutData } from '@/utils/response';
import { TransactionValidation } from '@/validations/transaction.validation';
import { Validation } from '@/validations/validation';

export class TransactionService {
  static async createTransaction(id: number, request: TransactionRequest) {
    const { eventId, seatRequests, redeemedPoints, voucherId } =
      Validation.validate(TransactionValidation.CREATE, request);

    // check event availability
    const event = await EventRepository.getEventByIdWithTransaction(
      eventId,
      id,
    );
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

    if (event.transactions.length) {
      const userTransactions = event.transactions.reduce((acc, curr) => {
        return acc + curr.quantity;
      }, 0);

      if (userTransactions >= event.limitCheckout) {
        throw new ErrorResponse(400, 'You have reached limit checkout!');
      }

      if (userTransactions + seatRequests > event.limitCheckout) {
        throw new ErrorResponse(400, 'Seat requests exceeds limit checkout!');
      }
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

        const transaction = await tx.transaction.create({
          data: {
            amount: event.price,
            quantity: seatRequests,
            originalAmount: 0,
            paymentStatus: 'success',
            user: { connect: { id } },
            event: { connect: { id: eventId } },
          },
        });

        const prefixTicketCode = event.name.slice(0, 3).toUpperCase();
        for (let index = 0; index < seatRequests; index++) {
          await tx.transactionDetail.create({
            data: {
              ticketCode: generateTicketCode(prefixTicketCode),
              transaction: { connect: { id: transaction.id } },
            },
          });
        }
      });

      return responseWithoutData(201, true, 'Transaction created!');
    }

    // transaction for event is not free
    await prisma.$transaction(async (tx) => {
      await tx.event.update({
        data: {
          availableSeats: event.availableSeats - seatRequests,
        },
        where: { id: event.id },
      });

      let transaction: any = null;
      if (voucherId && redeemedPoints) {
        const originalAmount = event.price * seatRequests;
        const totalDiscount = (originalAmount * voucher.discount) / 100;
        const amountAfterDiscount = originalAmount - totalDiscount;

        await tx.voucher.update({
          where: { id: voucherId },
          data: { usage: { increment: 1 } },
        });

        if (amountAfterDiscount <= redeemedPoints) {
          await tx.point.update({
            where: { id: user?.point?.id },
            data: { balance: { decrement: amountAfterDiscount } },
          });

          transaction = await tx.transaction.create({
            data: {
              amount: event.price,
              quantity: seatRequests,
              originalAmount,
              discountedAmount: 0,
              paymentStatus: 'success',
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

          transaction = await tx.transaction.create({
            data: {
              amount: event.price,
              quantity: seatRequests,
              originalAmount,
              discountedAmount: totalAmount,
              paymentStatus: 'waiting',
              user: { connect: { id } },
              event: { connect: { id: eventId } },
              voucher: { connect: { id: voucherId } },
              redeemedPoints,
            },
          });
        }
      } else if (voucherId) {
        const originalAmount = event.price * seatRequests;
        const totalDiscount = (originalAmount * voucher.discount) / 100;
        const amountAfterDiscount = originalAmount - totalDiscount;

        await tx.voucher.update({
          where: { id: voucherId },
          data: { usage: { increment: 1 } },
        });

        transaction = await tx.transaction.create({
          data: {
            amount: event.price,
            quantity: seatRequests,
            originalAmount,
            discountedAmount: amountAfterDiscount,
            paymentStatus: amountAfterDiscount === 0 ? 'success' : 'waiting',
            user: { connect: { id } },
            event: { connect: { id: eventId } },
            voucher: { connect: { id: voucherId } },
          },
        });
      } else if (redeemedPoints) {
        const originalAmount = event.price * seatRequests;

        if (originalAmount <= redeemedPoints) {
          await tx.point.update({
            where: { id: user?.point?.id },
            data: { balance: { decrement: originalAmount } },
          });

          transaction = await tx.transaction.create({
            data: {
              amount: event.price,
              quantity: seatRequests,
              originalAmount,
              discountedAmount: 0,
              paymentStatus: 'success',
              user: { connect: { id } },
              event: { connect: { id: eventId } },
              redeemedPoints: originalAmount,
            },
          });
        } else {
          const totalAmount = originalAmount - redeemedPoints;

          await tx.point.update({
            where: { id: user?.point?.id },
            data: { balance: { decrement: redeemedPoints } },
          });

          transaction = await tx.transaction.create({
            data: {
              amount: event.price,
              quantity: seatRequests,
              originalAmount,
              discountedAmount: totalAmount,
              paymentStatus: 'waiting',
              user: { connect: { id } },
              event: { connect: { id: eventId } },
              redeemedPoints,
            },
          });
        }
      } else {
        transaction = await tx.transaction.create({
          data: {
            amount: event.price,
            quantity: seatRequests,
            originalAmount: event.price * seatRequests,
            paymentStatus: 'waiting',
            user: { connect: { id } },
            event: { connect: { id: eventId } },
          },
        });
      }

      const prefixTicketCode = event.name.slice(0, 3).toUpperCase();
      for (let index = 0; index < seatRequests; index++) {
        await tx.transactionDetail.create({
          data: {
            ticketCode: generateTicketCode(prefixTicketCode),
            transaction: { connect: { id: transaction.id } },
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
    );
    console.log(response);
    // for(let i = 0; i < response.eventsSuccess.length; i++){
    //   if(response.eventsSuccess[i].eve)

    // }
    return responseWithData(
      200,
      true,
      'success get event status  By Date',
      response,
    );
  }
}
