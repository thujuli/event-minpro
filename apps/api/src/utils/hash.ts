import { SALT } from '@/config';
import { genSalt, hash } from 'bcrypt';

export const hashPassword = async (password: string) => {
  const generateSalt = await genSalt(Number(SALT));
  return await hash(password, generateSalt);
};
