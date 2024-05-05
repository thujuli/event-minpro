import { EventQuery } from '@/types/event.type';
import prisma from '@/prisma';
export class EventRepository {
  static async getEvents(query: EventQuery) {
    console.log(query);

    const filter: any = {
      price: query.price ? Number(query.price) : undefined,
      locationId: query.locationId ? Number(query.locationId) : undefined,
      categoryId: query.categoryId ? Number(query.categoryId) : undefined,
    };

    const res = await prisma.event.findMany({
      where: filter,
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
}
