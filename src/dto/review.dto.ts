import { GameDTO } from "./game.dto";

export interface ReviewDTO {
  id?: number;
  rating: number;
  comment: string;
  gameId: number;
}