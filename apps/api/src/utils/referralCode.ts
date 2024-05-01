import { nanoid } from 'nanoid';

const REFERRAL_CODE_LENGTH = 6;

export function generateReferralCode() {
  return nanoid(REFERRAL_CODE_LENGTH);
}
