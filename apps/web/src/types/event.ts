export type EventResponse = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageURL: string;
  availableSeats: number;
  limitCheckout: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
  locationId: number;
  categoryId: number;
};
