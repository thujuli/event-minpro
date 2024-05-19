import { ErrorResponse } from '@/utils/error';

describe('ErrorResponse', () => {
  it('should create an error response with custom status code', () => {
    const error = new ErrorResponse(400, 'Bad Request');

    expect(error.status).toBe(400);
    expect(error.message).toBe('Bad Request');
  });
});
