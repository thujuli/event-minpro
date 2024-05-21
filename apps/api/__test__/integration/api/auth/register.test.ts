import App from '@/app';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = new App().app;

describe('register', () => {
  const newUser = {
    username: 'user1',
    email: 'user1@example.com',
    password: '1234',
    isAdmin: false,
    referralCode: 'UNIQUE',
  };

  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.user.create({ data: newUser });
  });

  afterEach(async () => {
    const user1 = await prisma.user.findUnique({
      where: { username: 'user1' },
    });
    await prisma.user.delete({ where: { id: user1?.id } });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should return error if user input is invalid', async () => {
    const response = await request(app).post('/auth/register').send({
      username: 'hi',
      email: 'hi123',
      password: '1',
      isAdmin: 'yes',
      referralCode: 'HI',
    });

    expect(response.status).toBe(400);
    expect(response.body.rc).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Email format is invalid!');
    expect(response.body.message).toContain('isAdmin must be a boolean value!');
    expect(response.body.message).toContain(
      'Username must be at least 3 characters!',
    );
    expect(response.body.message).toContain(
      'Password must be at least 4 characters!',
    );
    expect(response.body.message).toContain(
      'Referral Code must be at least 6 characters!',
    );
  });

  it('should return error if user register as admin but input referral code', async () => {
    const response = await request(app).post('/auth/register').send({
      username: 'user2',
      email: 'user2@example.com',
      password: '1234',
      isAdmin: true,
      referralCode: 'UNIQUE',
    });

    expect(response.status).toBe(400);
    expect(response.body.rc).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain(
      'Admin cannot provide a referral code!',
    );
  });

  it('should return error if username already exists', async () => {
    const response = await request(app).post('/auth/register').send({
      username: 'user1',
      email: 'username@mail.com',
      password: '1234',
      isAdmin: false,
      referralCode: 'UNIQUE',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      rc: 400,
      success: false,
      message: 'Username already exists!',
    });
  });

  it('should return error if email already exists', async () => {
    const response = await request(app).post('/auth/register').send({
      username: 'user2',
      email: 'user1@example.com',
      password: '1234',
      isAdmin: false,
      referralCode: 'UNIQUE',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      rc: 400,
      success: false,
      message: 'Email already exists!',
    });
  });

  it('should return error if user input invalid referral code', async () => {
    const response = await request(app).post('/auth/register').send({
      username: 'user2',
      email: 'user2@example.com',
      password: '1234',
      isAdmin: false,
      referralCode: 'NOTFOUND',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      rc: 400,
      success: false,
      message: 'Invalid referral code!',
    });
  });

  it('should successfully register a new user without referral code', async () => {
    const response = await request(app).post('/auth/register').send({
      username: 'user2',
      email: 'user2@example.com',
      password: '1234',
      isAdmin: false,
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      rc: 201,
      success: true,
      message: 'Registration was successful',
    });

    const user = await prisma.user.findUnique({ where: { username: 'user2' } });
    expect(user?.isAdmin).toBe(false);
    expect(user?.email).toBe('user2@example.com');
    expect(user?.username).toBe('user2');
    expect(user?.referralCode).not.toBe(null);
    expect(user?.password).not.toBe('1234');

    // delete user2
    await prisma.user.delete({ where: { id: user?.id } });
  });

  it('should successfully register a new user with referral code', async () => {
    const response = await request(app).post('/auth/register').send({
      username: 'user3',
      email: 'user3@example.com',
      password: '1234',
      isAdmin: false,
      referralCode: 'UNIQUE',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      rc: 201,
      success: true,
      message: 'Registration was successful',
    });

    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 3);

    // user3 should has voucher
    const user = await prisma.user.findUnique({ where: { username: 'user3' } });
    expect(user?.isAdmin).toBe(false);
    expect(user?.email).toBe('user3@example.com');
    expect(user?.username).toBe('user3');
    expect(user?.referralCode).not.toBe(null);
    expect(user?.password).not.toBe('1234');

    const voucher = await prisma.voucher.findFirst({
      where: { user: { id: user?.id } },
    });

    expect(voucher?.discount).toBe(10);
    expect(voucher?.maxUsage).toBe(1);
    expect(voucher?.usage).toBe(0);
    expect(voucher?.name.startsWith('UNIQUE')).toBe(true);
    expect(voucher?.expiryDate?.getDate()).toEqual(expiryDate.getDate());

    // the user whose referral code is UNIQUE should have 10000 point
    const userByReferralCode = await prisma.user.findUnique({
      where: { referralCode: 'UNIQUE' },
      include: { point: true },
    });

    expect(userByReferralCode?.point?.balance).toBe(10000);
    expect(userByReferralCode?.point?.expiryDate?.getDate()).toEqual(
      expiryDate.getDate(),
    );

    // delete user3
    await prisma.user.delete({ where: { id: user?.id } });
  });

  it('should user who have referral code will increase point by 10000', async () => {
    await request(app).post('/auth/register').send({
      username: 'user4',
      email: 'user4@example.com',
      password: '1234',
      isAdmin: false,
      referralCode: 'UNIQUE',
    });

    const userByReferralCode1 = await prisma.user.findUnique({
      where: { referralCode: 'UNIQUE' },
      include: { point: true },
    });

    expect(userByReferralCode1?.point?.balance).toBe(10000);

    await request(app).post('/auth/register').send({
      username: 'user5',
      email: 'user5@example.com',
      password: '1234',
      isAdmin: false,
      referralCode: 'UNIQUE',
    });

    const userByReferralCode2 = await prisma.user.findUnique({
      where: { referralCode: 'UNIQUE' },
      include: { point: true },
    });
    expect(userByReferralCode2?.point?.balance).toBe(20000);

    // delete the user
    await prisma.user.deleteMany({
      where: { username: { in: ['user4', 'user5'] } },
    });
  });
});
