import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MissingFieldError } from "../../../../core/presentation/errors/missing-field-error";
import { failureResponse, successResponse } from "../../../../core/presentation/helpers/http-handler";
import { ILoginWithTokenParams, LoginWithTokenUseCase } from "../../domain/usecases/login-with-token-usecase";


export class LoginWithTokenController implements Controller {
    constructor (private loginWithTokenUsecase: LoginWithTokenUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            const useCaseData: ILoginWithTokenParams = req.body;
            
            if (!useCaseData.data.access_token) {
                throw new MissingFieldError("access_token");
            }
            const logon = await this.loginWithTokenUsecase.run(useCaseData);
            successResponse(res, logon);
        }
        catch (error) {
            failureResponse(res, error);
        }
    }
}