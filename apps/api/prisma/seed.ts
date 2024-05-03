import { PrismaClient } from '@prisma/client';
import { locations } from './data/locations';
import { categories } from './data/categories';

const prisma = new PrismaClient();

async function seed() {
  for (const location of locations) {
    await prisma.location.create({ data: location });
  }

  for (const category of categories) {
    await prisma.category.create({ data: category });
  }
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
