import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { consoleService } from "../services/console.service";
import { reviewService } from "../services/review.service"; // Importer le service des reviews
import { ConsoleDTO } from "../dto/console.dto";

@Route("consoles")
@Tags("Consoles")
export class ConsoleController extends Controller {
  // Récupère toutes les consoles
  @Get("/")
  public async getAllConsole(): Promise<ConsoleDTO[]> {
    return consoleService.getAllConsoles();
  }

  // Récupère une console par ID
  @Get("{id}")
  public async getConsoleById(@Path() id: number): Promise<ConsoleDTO | null> {
    return consoleService.getConsoleById(id);
  }

  // Crée une nouvelle console
  @Post("/")
  public async createConsole(
    @Body() requestBody: ConsoleDTO
  ): Promise<ConsoleDTO> {
    const { name, manufacturer } = requestBody;
    return consoleService.createConsole(name, manufacturer);
  }

  // Supprime une console par ID
  @Delete("{id}")
  public async deleteConsole(@Path() id: number): Promise<void> {
    const hasReviews = await reviewService.hasReviewsForConsole(id);
    if (hasReviews) {
      this.setStatus(400); // Bad Request
      throw new Error("Cannot delete console with existing reviews for its games.");
    }
    await consoleService.deleteConsole(id);
    this.setStatus(204); // No Content
  }

  // Met à jour une console par ID
  @Patch("{id}")
  public async updateConsole(
    @Path() id: number,
    @Body() requestBody: ConsoleDTO
  ): Promise<ConsoleDTO | null> {
    const { name, manufacturer } = requestBody;
    return await consoleService.updateConsole(id, name, manufacturer);
  }
}