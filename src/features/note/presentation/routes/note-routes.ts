import { Request, Response, Router } from "express";
import { UserRepository } from "../../../../core/infra/database/repositories/db-user-repository";
import { CacheRepository } from "../../../../core/infra/database/repositories/redis-cache-repository";
import { CreateNoteUseCase } from "../../domain/usecases/create-note-usecase";
import { DeleteNoteUseCase } from "../../domain/usecases/delete-note-usecase";
import { EditNoteUseCase } from "../../domain/usecases/edit-note-usecase";
import { ViewNoteUseCase } from "../../domain/usecases/view-note-usecase";
import { NoteRepository } from "../../infra/repositories/db-note-repository";
import { CreateNoteController } from "../controllers/create-note-controller";
import { DeleteNoteController } from "../controllers/delete-note-controller";
import { EditNoteController } from "../controllers/edit-note-controller";
import { ViewNoteController } from "../controllers/view-note-controller";
import { validateToken } from "../middlewares/validate-token-middleware";

export class NoteRouter {
    static getRoutes() {
        const routes = Router();

        const userRepo = new UserRepository();
        const noteRepo = new NoteRepository();
        const cacheRepo = new CacheRepository();

        const createNoteUseCase = new CreateNoteUseCase(userRepo, noteRepo, cacheRepo);
        const createNoteController = new CreateNoteController(createNoteUseCase);

        const viewNoteUseCase = new ViewNoteUseCase(userRepo, cacheRepo);
        const viewNoteController = new ViewNoteController(viewNoteUseCase);

        const editNoteUseCase = new EditNoteUseCase(noteRepo, cacheRepo);
        const editNoteController = new EditNoteController(editNoteUseCase);

        const deleteNoteUseCase = new DeleteNoteUseCase(noteRepo, cacheRepo);
        const deleteNoteController = new DeleteNoteController(deleteNoteUseCase);


        routes.post("/", validateToken,
            (req: Request, res: Response) => createNoteController.execute(req, res));
        routes.get("/:uid?", validateToken,
            (req: Request, res: Response) => viewNoteController.execute(req, res));
        routes.put("/:uid", validateToken,
            (req: Request, res: Response) => editNoteController.execute(req, res));
        routes.delete("/:uid", validateToken,
            (req: Request, res: Response) => deleteNoteController.execute(req, res));

        return routes;
    }
}