import { Review } from "../models/review.model";
import { ReviewDTO } from "../dto/review.dto";
import { Game } from "../models/game.model"; 

export class ReviewService {
  public async getAllReviews(): Promise<Review[]> {
    return await Review.findAll({
        include: [
            {
                model: Game,
                as: "game",
            },
        ],
    });
}

  public async getReviewById(id: number): Promise<ReviewDTO | null> {
    return Review.findByPk(id);
  }

  public async createReview(reviewDTO: ReviewDTO): Promise<ReviewDTO> {
    const review = await Review.create({
      ...reviewDTO,
      review_text: reviewDTO.review_text ?? "",
    });
    return review;
  }

  public async updateReview(id: number, reviewDTO: Partial<ReviewDTO>): Promise<ReviewDTO | null> {
    const review = await Review.findByPk(id);
    if (!review) {
      return null;
    }

    if (reviewDTO.rating !== undefined) {
      review.rating = reviewDTO.rating;
    }

    if (reviewDTO.review_text !== undefined) {
      review.review_text = reviewDTO.review_text;
    }

    await review.save();
    return review;
  }

  public async deleteReview(id: number): Promise<void> {
    const review = await Review.findByPk(id);
    if (review) {
      await review.destroy();
    }
  }

  public async hasReviewsForConsole(consoleId: number): Promise<boolean> {
    const games = await Game.findAll({ where: { console_id: consoleId } });
    const gameIds = games.map(game => game.id);
    const reviewCount = await Review.count({ where: { game_id: gameIds } });
    return reviewCount > 0;
  }
}

export const reviewService = new ReviewService();