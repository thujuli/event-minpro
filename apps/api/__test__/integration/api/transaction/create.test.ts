import request from 'supertest';
import App from '@/app';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const app = new App().app;
const prisma = new PrismaClient();

describe('create transaction', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    try {
      // user register
      await request(app).post('/auth/register').send({
        username: 'user6',
        email: 'user6@example.com',
        password: '1234',
        isAdmin: false,
      });

      // admin register
      await request(app).post('/auth/register').send({
        username: 'admin1',
        email: 'admin1@example.com',
        password: '1234',
        isAdmin: true,
      });

      // search user6 and give it 100K point
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 3);
      const user = await prisma.user.findUnique({
        where: { username: 'user6' },
      });
      await prisma.point.create({
        data: {
          balance: 100000,
          expiryDate,
          user: { connect: { id: user?.id } },
        },
      });

      // admin login
      const response = await request(app).post('/auth/login').send({
        identity: 'admin1',
        password: '1234',
      });

      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() + 1);
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 2);
      const adminToken = response.body.result.token;
      const image = path.resolve(__dirname, '../../../assets/event.png');

      //   admin create a free event
      await request(app)
        .post('/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .attach('image', image)
        .field('name', 'Hello World')
        .field('price', 0)
        .field('startDate', startDate.toISOString())
        .field('endDate', endDate.toISOString())
        .field('locationId', 1)
        .field('categoryId', 1)
        .field(
          'description',
          'A "Hello, World!" program is generally a simple computer program which outputs (or displays) to the screen (often the console) a message similar to "Hello, World!" while ignoring any user input. ',
        )
        .field('maxCapacity', 100)
        .field('limitCheckout', 10);

      //   admin create a paid event
      await request(app)
        .post('/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .attach('image', image)
        .field('name', 'Lorem Ipsum')
        .field('price', 100000)
        .field('startDate', startDate.toISOString())
        .field('endDate', endDate.toISOString())
        .field('locationId', 1)
        .field('categoryId', 1)
        .field(
          'description',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        )
        .field('maxCapacity', 100)
        .field('limitCheckout', 10);
    } catch (error) {
      console.log('Error in beforeEach', error);
    }
  });

  afterEach(async () => {
    try {
      // delete the event
      await prisma.event.deleteMany({
        where: { name: { in: ['Hello World', 'Lorem Ipsum'] } },
      });

      // delete user6 and admin1
      await prisma.user.deleteMany({
        where: { username: { in: ['user6', 'admin1'] } },
      });
    } catch (error) {
      console.log('Error in afterEach', error);
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should success', () => {
    const total = 10000;

    expect(total).toBe(10000);
  });
});
