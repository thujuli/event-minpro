export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  referralCode?: string;
};

export type UniqueUserField = {
  id?: number;
  username?: string;
  email?: string;
  referralCode?: string;
};
