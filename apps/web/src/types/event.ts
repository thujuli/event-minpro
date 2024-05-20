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

export type EventResponse = {
  id: number;
  name: string;
  price: number;
  description: string;
  availableSeats: number;
  maxCapacity: number;
  imageURL: string;
  limitCheckout: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  locationId: number;
  categoryId: number;
};
