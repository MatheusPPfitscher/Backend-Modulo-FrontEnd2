import { Request, Response, Router } from "express";
import { UserRepository } from "../../core/database/repositories/user-repository";
import { AuthController } from "./auth-controller";

export class AuthRouter {
    static getRoutes() {
        const routes = Router();
        const userRepository = new UserRepository();
        const authController = new AuthController(userRepository);
        routes.post("/", (req: Request, res: Response) => authController.login(req, res));
        return routes;
    }
}