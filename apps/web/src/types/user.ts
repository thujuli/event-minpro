import { CategoryResponse } from "./category";
import { LocationResponse } from "./location";

export type UserEventResponse = {
  id: number;
  name: string;
  price: number;
  category: CategoryResponse;
  location: LocationResponse;
  availableSeats: number;
  startDate: string;
  endDate: string;
  createdAt: string;
};
