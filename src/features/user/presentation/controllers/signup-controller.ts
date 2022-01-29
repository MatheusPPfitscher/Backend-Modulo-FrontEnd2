import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { failureResponse, successResponse } from "../../../../core/presentation/helpers/http-handler";
import { IUser } from "../../domain/model/user";
import { ISignUpParams, SignUpUseCase } from "../../domain/usecases/signup-usecase";

export class UserController implements Controller {
    constructor (private signUpUseCase: SignUpUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            const useCaseData: ISignUpParams = {
                username: req.body.username,
                password: req.body.password
            };

            const userCreation = await this.signUpUseCase.run(useCaseData);
            successResponse(res, "UserCreated", userCreation);
        }
        catch (error) {
            failureResponse(res, error);
        }
    }
}