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
                data: {
                    email: req.body.data.email,
                    password: req.body.data.password
                }

            };
            if (!useCaseData.data.email) {
                throw new MissingFieldError("displayName");
            }
            const logon = await this.loginUseCase.run(useCaseData);
            successResponse(res, logon);
        }
        catch (error) {
            failureResponse(res, error);
        }
    }
}