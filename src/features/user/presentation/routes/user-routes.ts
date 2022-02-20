import { Request, Response, Router } from "express";
import { UserRepository } from "../../../../core/infra/database/repositories/db-user-repository";
import { logRequest } from "../../../../core/presentation/middlewares/log-requests-middleware";
import { SignUpUseCase } from "../../domain/usecases/signup-usecase";
import { UserController } from "../controllers/signup-controller";

export class UserRouter {
    static getRoutes() {
        const routes = Router();
        const userRepository = new UserRepository();
        const signUpUseCase = new SignUpUseCase(userRepository);
        const userController = new UserController(signUpUseCase);
        routes.post('/', logRequest, (req: Request, res: Response) => userController.execute(req, res));
        return routes;
    }
}