import { EventRepository } from '@/repositories/event.repository';
import { EventQuery, EventRequest } from '@/types/event.type';
import {
  responseDataWithPagination,
  responseWithData,
  responseWithoutData,
} from '@/utils/response';
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

  static async getEventsBySearch(query: EventQuery) {
    const eventQuery = Validation.validate(EventValidation.QUERY, query);
    if (!eventQuery.page) eventQuery.page = 1;
    if (!eventQuery.limit) eventQuery.limit = 10;

    const response = await EventRepository.getEventsBySearch(eventQuery);
    const totalEvent = await EventRepository.getTotalEventsBySearch(eventQuery);

    return responseDataWithPagination(
      200,
      'Get events successfully',
      response,
      Number(eventQuery.page),
      Number(eventQuery.limit),
      totalEvent,
    );
  }

  static async getEventById(query: EventQuery) {
    const eventQuery = Validation.validate(EventValidation.QUERY, query);

    const response = await EventRepository.getEventByIdWithInclude(eventQuery);

    return responseWithData(200, true, 'Get events successfully', response);
  }

  static async createEvent(
    id: number,
    request: EventRequest,
    file: Express.Multer.File,
  ) {
    const eventRequest = Validation.validate(EventValidation.CREATE, request);
    const validateFile = EventValidation.fileValidation(file);

    await EventRepository.createEvent(id, eventRequest, validateFile);
    return responseWithoutData(201, true, 'Create event successfully');
  }

  static async getEventByUser(id: number) {
    // const eventQuery = Validation.validate(EventValidation.REQUESTBYIDUSER, body);

    const response = await EventRepository.getEventByUser(id);
    return responseWithData(
      200,
      true,
      'Get events name successfully',
      response,
    );
  }
}
