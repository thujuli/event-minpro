import { PaymentStatus } from '@prisma/client';
import { z } from 'zod';

export class TransactionValidation {
  static GET = z.object({});

  static CREATE = z.object({
    eventId: z
      .number({ required_error: 'EventId is required!' })
      .int({ message: 'EventId must be an integer!' })
      .positive({ message: 'EventId must be a positive number!' }),
    seatRequests: z
      .number({ required_error: 'Seat Requests is required!' })
      .int({ message: 'Seat Requests must be an integer!' })
      .positive({ message: 'Seat Requests must be a positive number!' }),
    voucherId: z
      .number({ message: 'VoucherId must be a number' })
      .int({ message: 'VoucherId must be an integer' })
      .positive({ message: 'VoucherId must be a positive number' })
      .optional(),
    redeemedPoints: z
      .number({ message: 'Redeemed Points must be a number' })
      .int({ message: 'Redeemed Points must be an integer' })
      .min(0, { message: 'Redeemed Points must be at least 0!' })
      .optional(),
  });
}
