import prisma from '@/prisma';
import { CreateFeedback } from '@/types/review.type';
import { PaymentStatus, TransactionCheckout } from '@/types/transaction.type';
import { Transaction } from '@prisma/client';

export class TransactionRepository {
  static async getEventWaiting(id: number, data: TransactionCheckout) {
    const response = await prisma.transaction.findMany({
      where: {
        paymentStatus: PaymentStatus.WAITING,
        userId: id,
      },
      include: {
        event: true,
      },
    });
    // Group events by userId
    const groupedEvents: Record<number, Transaction[]> = {};
    response.forEach((transaction) => {
      if (!groupedEvents[transaction.userId]) {
        groupedEvents[transaction.userId] = [];
      }
      groupedEvents[transaction.userId].push(transaction);
    });
    // Rename the key "1" to "eventsWaiting"
    const result = {
      eventsWaiting: groupedEvents['1'],
    };
    return result;
  }

  static async getEventSuccess(id: number, data: TransactionCheckout) {
    const response = await prisma.transaction.findMany({
      where: {
        paymentStatus: PaymentStatus.SUCCESS,
        userId: id,
      },
      include: {
        event: true,
      },
    });
    // Group events by userId
    const groupedEvents: Record<number, Transaction[]> = {};
    response.forEach((transaction) => {
      if (!groupedEvents[transaction.userId]) {
        groupedEvents[transaction.userId] = [];
      }
      groupedEvents[transaction.userId].push(transaction);
    });
    // Rename the key "1" to "eventsWaiting"
    const result = {
      eventsSuccess: groupedEvents['1'],
    };
    return result;
  }
  static async getEventSuccessByDate(id: number, data: TransactionCheckout) {
    const response = await prisma.transaction.findMany({
      where: {
        paymentStatus: PaymentStatus.SUCCESS,
        userId: id,
        event: {
          endDate: {
            gt: new Date(), // lt digunakan untuk mencari tanggal yang lebih kecil dari waktu sekarang
          },
        },
      },
      include: {
        event: true,
      },
    });

    return response;
  }
}
