export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  referralCode?: string;
};
