import { hashPassword, comparePassword } from '@/utils/hash';

describe('hashPassword', () => {
  it('should hash password', async () => {
    const password = 'password';
    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).not.toBe(password);
  });
});

describe('comparePassword', () => {
  it('should compare password', async () => {
    const password = 'password';
    const hashedPassword = await hashPassword(password);
    const compare = await comparePassword(password, hashedPassword);

    expect(compare).toBe(true);
  });
});
