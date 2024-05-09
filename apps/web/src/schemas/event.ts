import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
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
    location: z.coerce.number({ invalid_type_error: "Location is required!" }),
    category: z.coerce.number({ invalid_type_error: "Category is required!" }),
    description: z
      .string({ required_error: "Description is required!" })
      .min(100, { message: "Description must be at least 100 characters!" }),
    maxCapacity: z.coerce
      .number({ invalid_type_error: "Max Capacity is required!" })
      .min(1, { message: "Max Capacity must be at least 1!" }),
    limitCheckout: z.coerce.number({
      invalid_type_error: "Limit Checkout is required!",
    }),
    image: z
      .any()
      .refine((files) => files?.length == 1, "Image is required!")
      .refine(
        (files) => files?.[0]?.size < MAX_FILE_SIZE,
        "Image must be less than 2MB!",
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png and .webp files are accepted.",
      ),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "Start date cannot be after end date!",
    path: ["endDate"],
  })
  .refine(
    (data) => data.limitCheckout > 0 && data.limitCheckout <= data.maxCapacity,
    {
      message:
        "Limit Checkout must be greater than 0 and less than Max Capacity!",
      path: ["limitCheckout"],
    },
  );

export type EventSchema = z.infer<typeof eventSchema>;

export const eventImageSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required!")
    .refine(
      (files) => files?.[0]?.size < MAX_FILE_SIZE,
      "Image must be less than 2MB!",
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted.",
    ),
});

export type EventImageSchema = z.infer<typeof eventImageSchema>;
