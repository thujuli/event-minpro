import { z } from 'zod';

export class LocationValidation {
  static QUERY = z.object({
    name: z.string().optional(),
    page: z.coerce.number().optional(),
    per_page: z.coerce.number().optional(),
    sort_by: z.enum(['name']).optional(),
    sort_oder: z.enum(['asc', 'desc']).optional(),
  });
}
