export type TransactionCheckout = {
    paymentStatus : PaymentStatus
}
export enum PaymentStatus {
    WAITING = 'waiting',
    PAID = 'paid',
    SUCCESS = 'success',
    FAILED = 'failed',
  }