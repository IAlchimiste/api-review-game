import { Body, Controller, Get, Route, Tags, Path, Post, Patch, Delete } from "tsoa";
import { ReviewDTO } from "../dto/review.dto";
import { reviewService } from "../services/review.service";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
  @Get("/")
  public async getAllReviews(): Promise<ReviewDTO[]> {
    return reviewService.getAllReviews();
  }

  @Get("/{id}")
  public async getReviewById(@Path() id: number): Promise<ReviewDTO | null> {
    return reviewService.getReviewById(id);
  }

  @Post("/")
  public async createReview(@Body() requestBody: ReviewDTO): Promise<ReviewDTO> {
    return reviewService.createReview(requestBody);
  }

  @Patch("/{id}")
  public async updateReview(@Path() id: number, @Body() requestBody: Partial<ReviewDTO>): Promise<ReviewDTO | null> {
    return reviewService.updateReview(id, requestBody);
  }

  @Delete("/{id}")
  public async deleteReview(@Path() id: number): Promise<void> {
    return reviewService.deleteReview(id);
  }
}