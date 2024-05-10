import { nanoid } from 'nanoid';

const REFERRAL_CODE_LENGTH = 3;
const VOUCHER_CODE_LENGTH = 10;

export function generateReferralCode(username: string) {
  return username + nanoid(REFERRAL_CODE_LENGTH);
}

export function generateVoucherCode() {
  return nanoid(VOUCHER_CODE_LENGTH);
}
