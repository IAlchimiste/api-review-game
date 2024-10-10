import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";

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
    return Game.create(gameDTO);
  }
}

export const gameService = new GameService();
