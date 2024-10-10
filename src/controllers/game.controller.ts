import { Body, Controller, Get, Route, Tags, Path } from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.service";

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
}