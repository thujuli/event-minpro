import { generateJWTToken, verifyJWTToken } from '@/utils/jwt';

describe('generateJWTToken', () => {
  it('should generate a JWT token', () => {
    const token = generateJWTToken({ id: 1, name: 'John Doe' });

    expect(token).toBeDefined();
    expect(token.split('.').length).toBe(3);
  });
});

describe('verifyJWTToken', () => {
  it('should verify a JWT token', () => {
    const token = generateJWTToken({ id: 1, name: 'John Doe' });
    const decoded = verifyJWTToken(token);

    expect(decoded).toMatchObject({ id: 1, name: 'John Doe' });
  });
});
