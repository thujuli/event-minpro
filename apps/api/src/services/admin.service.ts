import prisma from '@/prisma';
import { TransactionRepository } from '@/repositories/transaction.repository';
import { UserRepository } from '@/repositories/user.repository';
import {
  AdminEventQuery,
  AdminEventTransactionQuery,
  AdminTotalSalesQuery,
} from '@/types/admin.type';
import { responseDataWithPagination, responseWithData } from '@/utils/response';
import { AdminValidation } from '@/validations/admin.validation';
import { Validation } from '@/validations/validation';

export class AdminService {
  static async getAdminEvents(id: number, query: AdminEventQuery) {
    const adminEventQuery = Validation.validate(
      AdminValidation.EVENT_QUERY,
      query,
    );

    if (!adminEventQuery.page) adminEventQuery.page = 1;
    if (!adminEventQuery.limit) adminEventQuery.limit = 10;
    if (!adminEventQuery.sort_by) adminEventQuery.sort_by = 'createdAt';
    if (!adminEventQuery.order_by) adminEventQuery.order_by = 'desc';

    const user = await UserRepository.getAdminEvents(id, adminEventQuery);
    const allUserEvents = await UserRepository.getAllAdminEvents(
      id,
      adminEventQuery,
    );

    const events = user?.events.map(
      ({ userId, categoryId, locationId, ...rest }) => rest,
    );

    return responseDataWithPagination(
      200,
      'Get admin events successfully',
      events!,
      Number(adminEventQuery.page),
      Number(adminEventQuery.limit),
      allUserEvents!.events.length,
    );
  }

  static async getAdminEventTransactions(
    id: number,
    query: AdminEventTransactionQuery,
  ) {
    const eventQuery = Validation.validate(
      AdminValidation.EVENT_TRANSACTION_QUERY,
      query,
    );

    if (!eventQuery.page) eventQuery.page = 1;
    if (!eventQuery.limit) eventQuery.limit = 10;
    if (!eventQuery.sort_by) eventQuery.sort_by = 'createdAt';
    if (!eventQuery.order_by) eventQuery.order_by = 'desc';

    const eventTransactions =
      await TransactionRepository.getAdminEventTransactions(id, eventQuery);

    const allEventTransactions =
      await TransactionRepository.getAllAdminEventTransactions(id);

    const transactions = eventTransactions?.map(
      ({ userId, eventId, voucherId, ...rest }) => rest,
    );

    return responseDataWithPagination(
      200,
      'Get admin event transactions successfully',
      transactions,
      Number(eventQuery.page),
      Number(eventQuery.limit),
      allEventTransactions.length,
    );
  }

  static async getAdminTotalSales(id: number, query: AdminTotalSalesQuery) {
    const { start_date: startDate, end_date: endDate } = Validation.validate(
      AdminValidation.TOTAL_SALES_QUERY,
      query,
    );

    // handle date
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    let lte = new Date(currentDate);

    if (endDate) {
      const newEndDate = new Date(endDate);
      newEndDate.setDate(newEndDate.getDate() + 1);
      lte = new Date(newEndDate);
    }

    // 7 days ago
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 7);

    const transactions = await prisma.transaction.groupBy({
      by: ['updatedAt'],
      where: {
        event: { user: { id } },
        paymentStatus: 'success',
        updatedAt: {
          gte: startDate ?? pastDate,
          lte,
        },
      },
      _sum: { discountedAmount: true },
    });

    const totalSales = transactions.map((transaction) => {
      return {
        revenue: transaction._sum.discountedAmount,
        date: transaction.updatedAt,
      };
    });

    return responseWithData(
      200,
      true,
      'Get admin total sales successfully',
      totalSales,
    );
  }
}
