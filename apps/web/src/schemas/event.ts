import { z } from "zod";

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export const eventSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required!" })
      .min(3, { message: "Name must be at least 3 characters!" }),
    price: z.coerce
      .number({ invalid_type_error: "Price is required!" })
      .min(0, { message: "Price must be at least 0!" }),
    startDate: z
      .date({ required_error: "Start date is required!" })
      .min(yesterday, {
        message: "Start date cannot be in the past!",
      }),
    endDate: z
      .date({ required_error: "End date is required!" })
      .min(yesterday, {
        message: "End date cannot be in the past!",
      }),
    location: z.string({ required_error: "Location is required!" }),
    category: z.string({ required_error: "Category is required!" }),
    description: z
      .string()
      .min(3, { message: "Description must be at least 3 characters!" })
      .optional(),
    capacity: z.coerce
      .number({ invalid_type_error: "Capacity is required!" })
      .min(0, { message: "Capacity must be at least 0!" }),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "Start date cannot be after end date!",
    path: ["endDate"],
  });

export type EventSchema = z.infer<typeof eventSchema>;
