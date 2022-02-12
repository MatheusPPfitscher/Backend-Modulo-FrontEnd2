import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MissingFieldError } from "../../../../core/presentation/errors/missing-field-error";
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
            if (!useCaseData.username) {
                throw new MissingFieldError("username");
            }
            const logon = await this.loginUseCase.run(useCaseData);
            successResponse(res, "LogonSuccessful", logon);
        }
        catch (error) {
            failureResponse(res, error);
        }
    }
}