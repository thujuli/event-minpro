import prisma from '@/prisma';
import { LocationQuery } from '@/types/location.type';

export class LocationRepository {
  static async getLocations(query: LocationQuery) {
    return await prisma.location.findMany({
      where: { name: { contains: query.name } },
      skip: (Number(query.page) - 1) * Number(query.per_page),
      take: Number(query.per_page),
      orderBy: { [query.sort_by!]: query.sort_oder },
    });
  }
}
