import { Body, Controller, Get, Route, Tags, Path, Post, Patch, Delete } from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.service";
import { BadRequestError } from "../error/BadRequestError";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }

  @Get("/{id}")
  public async getGameById(@Path() id: number): Promise<GameDTO | null> {
    return gameService.getGameById(id);
  }

  @Post("/")
  public async createGame(@Body() requestBody: GameDTO): Promise<GameDTO> {
    return gameService.createGame(requestBody);
  }

  @Patch("/{id}")
  public async updateGame(@Path() id: number, @Body() requestBody: Partial<GameDTO>): Promise<GameDTO | null> {
    return gameService.updateGame(id, requestBody);
  }

  @Delete("/{id}")
  public async deleteGame(@Path() id: number): Promise<void> {
    try {
      await gameService.deleteGame(id);
    } catch (error) {
      if (error instanceof BadRequestError) {
        this.setStatus(400); // Bad Request
        throw new Error(error.message);
      }
      throw error;
    }
  }
}