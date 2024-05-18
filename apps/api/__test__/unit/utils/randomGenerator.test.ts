import {
  generateReferralCode,
  generateVoucherCode,
  generateTicketCode,
} from '@/utils/randomGenerator';

describe('generateReferralCode', () => {
  it('should generate a referral code', () => {
    const username = 'john';
    const referralCode = generateReferralCode(username);

    expect(referralCode.length).toBe(username.length + 3);
    expect(referralCode.slice(0, username.length)).toBe(username);
    expect(referralCode.startsWith(username)).toBe(true);
  });
});

describe('generateVoucherCode', () => {
  it('should generate a voucher code', () => {
    const prefix = 'john';
    const voucherCode = generateVoucherCode(prefix);

    expect(voucherCode.length).toBe(prefix.length + 4);
    expect(voucherCode.slice(0, prefix.length + 1)).toBe(prefix + '-');
    expect(voucherCode.startsWith(prefix)).toBe(true);
  });
});

describe('generateTicketCode', () => {
  it('should generate a ticket code', () => {
    const prefix = 'JOHN';
    const ticketCode = generateTicketCode(prefix);

    expect(ticketCode.length).toBe(prefix.length + 7);
    expect(ticketCode.slice(0, prefix.length + 1)).toBe(prefix + '-');
    expect(ticketCode.startsWith(prefix)).toBe(true);
  });
});
