import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { failureResponse, successResponse } from "../../../../core/presentation/helpers/http-handler";
import { ILoginParams, LoginUseCase } from "../../domain/usecases/login-usecase";

export class LoginController implements Controller {
    constructor (private loginUseCase: LoginUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            const useCaseData: ILoginParams = {
                username: req.body.username,
                password: req.body.password
            };
            const logon = await this.loginUseCase.run(useCaseData);
            successResponse(res, "LogonSuccessful", logon);
        }
        catch (error) {
            failureResponse(res, error);
        }
    }
}