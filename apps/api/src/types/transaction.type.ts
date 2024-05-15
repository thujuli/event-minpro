export type TransactionCheckout = {
  paymentStatus: PaymentStatus;
};
export enum PaymentStatus {
  WAITING = 'waiting',
  PAID = 'paid',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export type TransactionRequest = {
  eventId: number;
  seatRequests: number;
  voucherId?: number;
  redeemedPoints?: number;
};

export type TotalSaleResponse = {
  date: Date;
  originalAmount: number;
  discountedAmount: number | null;
};

export type StatusResponse = {
  date: Date;
  waiting: number;
  paid: number;
  success: number;
  failed: number;
};
