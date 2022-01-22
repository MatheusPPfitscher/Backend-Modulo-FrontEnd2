import { Request, Response, Router } from "express";
import { NoteRepository } from "../../core/database/repositories/note-repository";
import { UserRepository } from "../../core/database/repositories/user-repository";
import { validateTokenRequest } from "./middlewares";
import { NoteController } from "./note-controller";

export class NoteRouter {
    static getRoutes() {
        const routes = Router();
        const userRepo = new UserRepository();
        const noteRepo = new NoteRepository();
        const noteController = new NoteController(noteRepo, userRepo);

        routes.post("/", validateTokenRequest,
            (req: Request, res: Response) => noteController.create(req, res));
        routes.get("/:uid?", validateTokenRequest,
            (req: Request, res: Response) => noteController.view(req, res));
        routes.put("/:uid", validateTokenRequest,
            (req: Request, res: Response) => noteController.edit(req, res));
        routes.delete("/:uid", validateTokenRequest,
            (req: Request, res: Response) => noteController.delete(req, res));

        return routes;
    }
}