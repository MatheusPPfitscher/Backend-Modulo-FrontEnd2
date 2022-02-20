import { Request, Response, Router } from "express";
import { UserRepository } from "../../../../core/infra/database/repositories/db-user-repository";
import { logRequest } from "../../../../core/presentation/middlewares/log-requests-middleware";
import { LoginUseCase } from "../../domain/usecases/login-usecase";
import { LoginController } from "../controllers/login-controller";

export class AuthRouter {
    static getRoutes() {
        const routes = Router();
        const userRepository = new UserRepository();
        const loginUseCase = new LoginUseCase(userRepository);
        const loginController = new LoginController(loginUseCase);
        routes.post("/", logRequest, (req: Request, res: Response) => loginController.execute(req, res));
        return routes;
    }
}