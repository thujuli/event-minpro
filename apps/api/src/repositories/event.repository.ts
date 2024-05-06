import { EventQuery } from '@/types/event.type';
import prisma from '@/prisma';
export class EventRepository {
  static async getEvents(query: EventQuery) {
    const filter: any = {
      price: query.price ? Number(query.price) : undefined,
      locationId: query.locationId ? Number(query.locationId) : undefined,
      categoryId: query.categoryId ? Number(query.categoryId) : undefined,
    };

    const res = await prisma.event.findMany({
      where: filter,
      include: {
        category: true,
        location: true,
      },
      skip: (Number(query.page) - 1) * Number(query.limit), // Lewati data sejumlah offset
      take: Number(query.limit), // Ambil sejumlah data sesuai limit
    });

    return res;
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
    console.log('QueryAAAAAAAAAA:', query);
    const filter: any = {
      name: query.name ? String(query.name) : undefined,
      locationId: query.locationId ? Number(query.locationId) : undefined,
      categoryId: query.categoryId ? Number(query.categoryId) : undefined,
    };

    const res = await prisma.event.findMany({
      where: {
        name: { contains: query.name },
        categoryId: filter.categoryId,
        locationId: filter.locationId,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        location: true,
      },
      skip: (Number(query.page) - 1) * Number(query.limit), // Lewati data sejumlah offset
      take: Number(query.limit), // Ambil sejumlah data sesuai limit
    });
    return res;
  }
  static async getTotalEventsBySearch(query: EventQuery) {
    const filter: any = {
      name: query.name ? String(query.name) : undefined,
      locationId: query.locationId ? Number(query.locationId) : undefined,
      categoryId: query.categoryId ? Number(query.categoryId) : undefined,
    };
    console.log(filter);
    return await prisma.event.count({
      where: {
        name: { contains: filter.name },
        locationId :filter.locationId,
        categoryId:filter.categoryId
      },
    });
  }
  static async getEventById(query: EventQuery) {
    const eventId = Number(query.id);

    const res = await prisma.event.findMany({
      where: {
        id: eventId,
      },
      include: {
        category: true,
        location: true,
      },
    });
    return res;
  }
}
