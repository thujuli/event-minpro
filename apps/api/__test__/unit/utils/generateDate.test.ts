import { decrementDate, incrementDate } from '@/utils/generateDate';

describe('incrementDate', () => {
  it('should increment date by 1 day', () => {
    const date = new Date(2024, 7, 11);
    const newDate = incrementDate(date, 1);

    expect(newDate.getDate()).toBe(date.getDate() + 1);
  });
});

describe('decrementDate', () => {
  it('should decrement date by 1 day', () => {
    const date = new Date(2024, 7, 11);
    const newDate = decrementDate(date, 1);

    expect(newDate.getDate()).toBe(date.getDate() - 1);
  });
});
