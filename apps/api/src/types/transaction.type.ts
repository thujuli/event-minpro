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
