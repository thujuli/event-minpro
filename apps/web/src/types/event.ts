export type EventRequest = {
  name: string;
  price: number;
  startDate: Date;
  endDate: Date;
  locationId: number;
  categoryId: number;
  description: string;
  maxCapacity: number;
  limitCheckout: number;
  image: File;
};
