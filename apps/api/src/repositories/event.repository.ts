import { EventQuery, EventRequest } from '@/types/event.type';
import prisma from '@/prisma';
export class EventRepository {
  static async getEvents(query: EventQuery) {
    const filter: any = {
      price: query.price ? Number(query.price) : undefined,
      locationId: query.locationId ? Number(query.locationId) : undefined,
      categoryId: query.categoryId ? Number(query.categoryId) : undefined,
    };

    return await prisma.event.findMany({
      where: filter,
      include: { category: true, location: true },
      skip: (Number(query.page) - 1) * Number(query.limit), // Lewati data sejumlah offset
      take: Number(query.limit), // Ambil sejumlah data sesuai limit
    });
  }
  static async getTotalEvents(query: EventQuery) {
    const filter: any = {
      price: query.price ? Number(query.price) : undefined,
      locationId: query.locationId ? Number(query.locationId) : undefined,
      categoryId: query.categoryId ? Number(query.categoryId) : undefined,
    };

    return await prisma.event.count({ where: filter });
  }
  static async getEventsBySearch(query: EventQuery) {
    const filter: any = {
      name: query.name ? String(query.name) : undefined,
      locationId: query.locationId ? Number(query.locationId) : undefined,
      categoryId: query.categoryId ? Number(query.categoryId) : undefined,
    };

    return await prisma.event.findMany({
      where: {
        name: { contains: query.name },
        categoryId: filter.categoryId,
        locationId: filter.locationId,
      },
      include: {
        category: { select: { name: true } },
        location: true,
      },
      skip: (Number(query.page) - 1) * Number(query.limit), // Lewati data sejumlah offset
      take: Number(query.limit), // Ambil sejumlah data sesuai limit
    });
  }

  static async getTotalEventsBySearch(query: EventQuery) {
    const filter: any = {
      name: query.name ? String(query.name) : undefined,
      locationId: query.locationId ? Number(query.locationId) : undefined,
      categoryId: query.categoryId ? Number(query.categoryId) : undefined,
    };

    return await prisma.event.count({
      where: {
        name: { contains: filter.name },
        locationId: filter.locationId,
        categoryId: filter.categoryId,
      },
    });
  }

  static async getEventByIdWithInclude(query: EventQuery) {
    const eventId = Number(query.id);

    return await prisma.event.findMany({
      where: { id: eventId },
      include: { category: true, location: true },
    });
  }

  static async getEventById(id: number) {
    return await prisma.event.findUnique({
      where: { id },
    });
  }

  static async createEvent(
    id: number,
    request: EventRequest,
    file: Express.Multer.File,
  ) {
    await prisma.event.create({
      data: {
        name: request.name,
        price: request.price,
        description: request.description,
        imageURL: `/assets/events/${file.filename}`,
        limitCheckout: request.limitCheckout,
        maxCapacity: request.maxCapacity,
        availableSeats: request.maxCapacity,
        startDate: new Date(request.startDate),
        endDate: new Date(request.endDate),
        user: { connect: { id } },
        location: { connect: { id: request.locationId } },
        category: { connect: { id: request.categoryId } },
      },
    });
  }
  static async getEventByUser(id: number) {
    return await prisma.event.findMany({
      where: { id: id },
    });
  }
}
