import { number, z } from 'zod';

export class EventValidation {
    static QUERY = z.object ({
        page:z.coerce.number({invalid_type_error: 'Page must be a Number!',}).optional(),
        limit:z.coerce.number({invalid_type_error: 'Limit must be a Number!',}).optional(),
        price: z.coerce.number({invalid_type_error: 'Price must be a Number!',}).optional(),
        categoryId:z.coerce.number({invalid_type_error: 'CategoryId must be a Number!',}).optional(),
        locationId: z.coerce.number({invalid_type_error: 'LocationId must be a Number!',}).optional(),
        location:z.string({invalid_type_error: 'LocationId must be a String!',}).optional(),
        category:z.string({invalid_type_error: 'LocationId must be a String!',}).optional(),
        name:z.string().optional(),
        id:z.coerce.string().optional()
    })
}