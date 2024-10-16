import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { BadRequestError } from "../error/BadRequestError"; 
import { Review } from "../models/review.model"; // Importer le modèle Review

export class GameService {
  public async getAllGames(): Promise<GameDTO[]> {
    return Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }

  public async getGameById(id: number): Promise<GameDTO | null> {
    const game = await Game.findByPk(id, {
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
    return game || null;
  }

  public async createGame(gameDTO: GameDTO): Promise<GameDTO> {
    if (!gameDTO.title || !gameDTO.console?.id) {
      throw new BadRequestError("Title and console_id are required");
    }
    const game = await Game.create(
      {
        title: gameDTO.title,
        console_id: gameDTO.console.id, 
      },
      {
        include: [
          {
            model: Console,
            as: "console",
          },
        ],
      }
    );
    return game;
  }

  public async updateGame(id: number, gameDTO: Partial<GameDTO>): Promise<GameDTO | null> {
    const game = await Game.findByPk(id);
    if (!game) {
      return null;
    }

    if (gameDTO.title !== undefined) {
      game.title = gameDTO.title;
    }

    if (gameDTO.console?.id !== undefined) {
      game.console_id = gameDTO.console.id;
    }

    await game.save();
    return game;
  }

  public async deleteGame(id: number): Promise<void> {
    const game = await Game.findByPk(id);
    if (!game) {
      throw new BadRequestError("Game not found");
    }

    const reviewCount = await Review.count({ where: { game_id: id } });
    if (reviewCount > 0) {
      throw new BadRequestError("Cannot delete a game with reviews");
    }

    await game.destroy();
  }
}

export const gameService = new GameService();