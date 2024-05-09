import { UserRepository } from '@/repositories/user.repository';
import { UserEventQuery } from '@/types/user.type';
import { ErrorResponse } from '@/utils/error';
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
}
