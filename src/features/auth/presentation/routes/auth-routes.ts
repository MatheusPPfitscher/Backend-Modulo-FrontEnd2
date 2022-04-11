import { Request, Response, Router } from "express";
import { UserRepository } from "../../../../core/infra/database/repositories/db-user-repository";
import { logRequest } from "../../../../core/presentation/middlewares/log-requests-middleware";
import { LoginUseCase } from "../../domain/usecases/login-usecase";
import { LoginWithTokenUseCase } from "../../domain/usecases/login-with-token-usecase";
import { LoginController } from "../controllers/login-controller";
import { LoginWithTokenController } from "../controllers/login-with-token-controller";

export class AuthRouter {
    static getRoutes() {
        const routes = Router();
        const userRepository = new UserRepository();
        const loginUseCase = new LoginUseCase(userRepository);
        const loginWithTokenUsecase = new LoginWithTokenUseCase(userRepository);
        const loginController = new LoginController(loginUseCase);
        const loginWithTokenController = new LoginWithTokenController(loginWithTokenUsecase);
        routes.post("/", logRequest, (req: Request, res: Response) => loginController.execute(req, res));
        routes.post("/access-token", logRequest, (req: Request, res: Response) => loginWithTokenController.execute(req, res));
        return routes;
    }
}