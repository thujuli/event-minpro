import { UserRepository } from '@/repositories/user.repository';
import { UserEventQuery, UserEventTransactionQuery } from '@/types/user.type';
import { responseDataWithPagination, responseWithData } from '@/utils/response';
import { UserValidation } from '@/validations/user.validation';
import { Validation } from '@/validations/validation';

export class UserService {
  static async getUserEvents(id: number, query: UserEventQuery) {
    const userEventQuery = Validation.validate(
      UserValidation.EVENT_QUERY,
      query,
    );

    if (!userEventQuery.page) userEventQuery.page = 1;
    if (!userEventQuery.limit) userEventQuery.limit = 10;
    if (!userEventQuery.sort_by) userEventQuery.sort_by = 'createdAt';
    if (!userEventQuery.order_by) userEventQuery.order_by = 'desc';

    const user = await UserRepository.getUserEvents(id, userEventQuery);
    const allUserEvents = await UserRepository.getAllUserEvents(
      id,
      userEventQuery,
    );

    const events = user?.events.map(
      ({ userId, categoryId, locationId, ...rest }) => rest,
    );

    return responseDataWithPagination(
      200,
      'Get user events successfully',
      events!,
      Number(userEventQuery.page),
      Number(userEventQuery.limit),
      allUserEvents!.events.length,
    );
  }

  static async getDataProfile(id: number) {
    const response = await UserRepository.getUserProfile(id);
    return responseWithData(
      200,
      true,
      'Get user profile successfully',
      response!,
    );
  }

  static async getUserEventTransactions(
    id: number,
    query: UserEventTransactionQuery,
  ) {
    const eventQuery = Validation.validate(
      UserValidation.EVENT_TRANSACTION_QUERY,
      query,
    );

    if (!eventQuery.page) eventQuery.page = 1;
    if (!eventQuery.limit) eventQuery.limit = 10;
    if (!eventQuery.sort_by) eventQuery.sort_by = 'createdAt';
    if (!eventQuery.order_by) eventQuery.order_by = 'desc';

    const eventTransactions = await UserRepository.getUserEventTransactions(
      id,
      eventQuery,
    );

    const allEventTransactions =
      await UserRepository.getAllUserEventTransactions(id);

    const transactions = eventTransactions?.map(
      ({ userId, eventId, voucherId, ...rest }) => rest,
    );

    return responseDataWithPagination(
      200,
      'Get user event transactions successfully',
      transactions,
      Number(eventQuery.page),
      Number(eventQuery.limit),
      allEventTransactions.length,
    );
  }
}
