import { TransactionRepository } from '@/repositories/transaction.repository';
import { UserRepository } from '@/repositories/user.repository';
import {
  AdminEventQuery,
  AdminEventTransactionQuery,
  FilterDate,
} from '@/types/admin.type';
import { decrementDate, incrementDate } from '@/utils/generateDate';
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

    const eventTransactions = await TransactionRepository.getEventTransactions(
      id,
      eventQuery,
    );

    const allEventTransactions =
      await TransactionRepository.getAllEventTransactions(id);

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

  static async getAdminTotalSales(id: number, query: FilterDate) {
    const { start_date: startDate, end_date: endDate } = Validation.validate(
      AdminValidation.FILTER_QUERY,
      query,
    );

    // handle date
    const currentDate = new Date();
    let lte = incrementDate(currentDate, 1);
    if (endDate) lte = incrementDate(new Date(endDate), 1);

    // 7 days ago
    const past7Days = decrementDate(currentDate, 7);

    const transactions =
      await TransactionRepository.getTotalSalesGroupByUpdatedAt(id, {
        gte: startDate ?? past7Days,
        lte,
      });

    const totalSales = transactions.map((transaction) => {
      return {
        revenue: transaction.discountedAmount ?? transaction.originalAmount,
        date: transaction.date,
      };
    });

    return responseWithData(
      200,
      true,
      'Get admin total sales successfully',
      totalSales,
    );
  }

  static async getAdminTransactionStatus(id: number, query: FilterDate) {
    const { start_date: startDate, end_date: endDate } = Validation.validate(
      AdminValidation.FILTER_QUERY,
      query,
    );

    // handle date
    const currentDate = new Date();
    let lte = incrementDate(currentDate, 1);
    if (endDate) lte = incrementDate(new Date(endDate), 1);

    // 7 days ago
    const past7Days = decrementDate(currentDate, 7);

    console.log(new Date());

    const statuses =
      await TransactionRepository.getTransactionStatusByUpdatedAt(id, {
        gte: startDate ?? past7Days,
        lte,
      });

    return responseWithData(
      200,
      true,
      'Get admin transaction status',
      statuses,
    );
  }
}
