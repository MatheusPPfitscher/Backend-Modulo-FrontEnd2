import { Request, Response, Router } from "express";
import { UserRepository } from "../../core/database/repositories/user-repository";
import { UserController } from "./user-controller";

export class UserRouter {
    static getRoutes() {
        const routes = Router();
        const userRepository = new UserRepository();
        const userController = new UserController(userRepository);
        routes.post('/', (req: Request, res: Response) => userController.createUser(req, res));
        return routes;
    }
}