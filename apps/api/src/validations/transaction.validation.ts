import { PaymentStatus } from '@prisma/client';
import { z } from 'zod';

export class TransactionValidation {
  static GET = z.object({});
}
