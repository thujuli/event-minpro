import { CategoryResponse } from "./category";
import { LocationResponse } from "./location";

export type UserEventResponse = {
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
  category: CategoryResponse;
  location: LocationResponse;
};
