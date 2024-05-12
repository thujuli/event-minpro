import { CategoryResponse } from "./category";
import { LocationResponse } from "./location";
import { PaymentStatus } from "./transaction";

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

export type UserEventTransactionResponse = {
  id: number;
  amount: number;
  redeemedPoints: number | null;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  user: { username: string };
  event: { name: string };
  voucher: { name: string | null };
};
