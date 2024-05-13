import { EventRepository } from "@/repositories/event.repository";
import { ReviewRepository } from "@/repositories/review.repository";
import { CreateFeedback } from "@/types/review.type";
import { ErrorResponse } from "@/utils/error";
import { responseWithoutData } from "@/utils/response";
import { ReviewValidation } from "@/validations/review.validation";
import { Validation } from "@/validations/validation";

export class ReviewService {
  static async CreateReview(id:number, body: CreateFeedback) {
    const review = Validation.validate(ReviewValidation.CREATE, body)

    // const event = await EventRepository.getEventById(id);

    // JIKA PASYMENT STATUS BUKAN SUKSES

    // JIKA END DATE KURANG DARI WAKTU SEKARANG ATAU START DATE
    
    await ReviewRepository.createReviews (id, review)

    return responseWithoutData(201, true, 'Success create review');

  }
}
