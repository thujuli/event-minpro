import {
  responseWithoutData,
  responseWithData,
  responseDataWithPagination,
} from '@/utils/response';

describe('responseWithoutData', () => {
  it('should return a response without data and success true', () => {
    const response = responseWithoutData(200, true, 'Success');

    expect(response).toEqual({
      rc: 200,
      success: true,
      message: 'Success',
    });
  });

  it('should return a response without data and success false', () => {
    const response = responseWithoutData(400, false, 'Bad Request');

    expect(response).toEqual({
      rc: 400,
      success: false,
      message: 'Bad Request',
    });
  });
});

describe('responseWithData', () => {
  it('should return a response with data and result a object', () => {
    const response = responseWithData(200, true, 'Success', { data: 'data' });

    expect(response).toEqual({
      rc: 200,
      success: true,
      message: 'Success',
      result: { data: 'data' },
    });
  });

  it('should return a response with data and result an array', () => {
    const response = responseWithData(200, true, 'Success', ['data']);

    expect(response).toEqual({
      rc: 200,
      success: true,
      message: 'Success',
      result: ['data'],
    });
  });
});

describe('responseDataWithPagination', () => {
  it('should return a response with data and pagination', () => {
    const response = responseDataWithPagination(
      200,
      'Success',
      { data: 'data' },
      1,
      10,
      100,
    );

    expect(response).toEqual({
      rc: 200,
      success: true,
      message: 'Success',
      result: { data: 'data' },
      page: 1,
      limit: 10,
      total: 100,
    });
  });
});
