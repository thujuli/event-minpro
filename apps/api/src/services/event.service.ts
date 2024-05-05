import { EventRepository } from '@/repositories/event.repository';
import { EventQuery } from '@/types/event.type';
import { responseDataWithPagination } from '@/utils/response';
import { EventValidation } from '@/validations/event.validation';
import { Validation } from '@/validations/validation';

export class EventService {
  static async getEvents(query: EventQuery) {
    const eventQuery = Validation.validate(EventValidation.QUERY, query);
    if (!eventQuery.page) eventQuery.page = 1;
    if (!eventQuery.limit) eventQuery.limit = 10;

    const response = await EventRepository.getEvents(eventQuery);
    const totalEvents = await EventRepository.getTotalEvents(eventQuery);

    return responseDataWithPagination(
      200,
      'Get events successfully',
      response,
      Number(eventQuery.page),
      Number(eventQuery.limit),
      totalEvents,
    );
  }
}
