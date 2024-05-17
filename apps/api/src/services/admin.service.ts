import { EventRepository } from '@/repositories/event.repository';
import { TransactionRepository } from '@/repositories/transaction.repository';
import { UserRepository } from '@/repositories/user.repository';
import {
  AdminEventQuery,
  AdminEventTransactionQuery,
  FilterDate,
} from '@/types/admin.type';
import { TransactionStatus } from '@/types/transaction.type';
import { ErrorResponse } from '@/utils/error';
import { decrementDate, incrementDate } from '@/utils/generateDate';
import {
  responseDataWithPagination,
  responseWithData,
  responseWithoutData,
} from '@/utils/response';
import { AdminValidation } from '@/validations/admin.validation';
import { EventValidation } from '@/validations/event.validation';
import { TransactionValidation } from '@/validations/transaction.validation';
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

    return responseWithData(
      200,
      true,
      'Get admin total sales successfully',
      transactions,
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

  static async updateAdminTransactionStatus(
    id: number,
    transactionId: string,
    request: TransactionStatus,
  ) {
    const newTransactionId = Validation.validate(
      TransactionValidation.TRANSACTION_ID,
      transactionId,
    );
    const { status } = Validation.validate(
      AdminValidation.UPDATE_TRANSACTION_STATUS,
      request,
    );

    const transaction = await TransactionRepository.getTransactionHasUser(
      Number(newTransactionId),
    );

    if (!transaction) throw new ErrorResponse(404, 'Transaction not found!');

    if (transaction.event.user.id !== id) {
      throw new ErrorResponse(401, 'This event is not yours!');
    }

    await TransactionRepository.updateTransactionStatus(
      Number(newTransactionId),
      status,
    );

    return responseWithoutData(
      200,
      true,
      'Update transaction status successfully',
    );
  }

  static async getAdminEventParticipations(
    id: number,
    eventId: string,
    query: AdminEventQuery,
  ) {
    const newEventId = Validation.validate(EventValidation.EVENT_ID, eventId);
    const adminEventQuery = Validation.validate(
      AdminValidation.EVENT_QUERY,
      query,
    );

    if (!adminEventQuery.page) adminEventQuery.page = 1;
    if (!adminEventQuery.limit) adminEventQuery.limit = 10;
    if (!adminEventQuery.sort_by) adminEventQuery.sort_by = 'createdAt';
    if (!adminEventQuery.order_by) adminEventQuery.order_by = 'desc';

    const event =
      await EventRepository.getEventIncludeTransactionWithPagination(
        Number(newEventId),
        {
          limit: Number(adminEventQuery.limit),
          page: Number(adminEventQuery.page),
          sort_by: adminEventQuery.sort_by,
          order_by: adminEventQuery.order_by,
        },
      );

    if (!event) throw new ErrorResponse(404, 'Event not found!');

    if (event.userId !== id) {
      throw new ErrorResponse(401, 'This event is not yours!');
    }

    const transactions = event.transactions.map((transaction) => {
      return {
        username: transaction.user.username,
        email: transaction.user.email,
        quantity: transaction.quantity,
        paymentStatus: transaction.paymentStatus,
        createdAt: transaction.createdAt,
      };
    });

    return responseWithData(
      200,
      true,
      'Get event participations successfully',
      transactions,
    );
  }
}
