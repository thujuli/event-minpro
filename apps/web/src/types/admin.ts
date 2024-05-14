import { CategoryResponse } from "./category";
import { LocationResponse } from "./location";
import { PaymentStatus } from "./transaction";

export type AdminEventResponse = {
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

export type AdminEventTransactionResponse = {
  id: number;
  amount: number;
  quantity: number;
  originalAmount: number;
  discountedAmount?: number;
  redeemedPoints: number | null;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  user: { username: string };
  event: { name: string };
  voucher: { name: string | null };
};

export type AdminTotalSalesFilter = {
  startDate?: string;
  endDate?: string;
};

export type AdminTotalSalesResponse = {
  revenue: number;
  date: string;
};
