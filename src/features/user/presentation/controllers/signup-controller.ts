import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MissingFieldError } from "../../../../core/presentation/errors/missing-field-error";
import { failureResponse, successResponse } from "../../../../core/presentation/helpers/http-handler";
import { IUser } from "../../domain/model/user";
import { ISignUpParams, SignUpUseCase } from "../../domain/usecases/signup-usecase";

export class UserController implements Controller {
    constructor (private signUpUseCase: SignUpUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            const useCaseData: ISignUpParams = {
                displayName: req.body.displayName,
                password: req.body.password,
                email: req.body.email
            };

            if (!useCaseData.displayName) {
                throw new MissingFieldError("displayName");
            }

            const userCreation = await this.signUpUseCase.run(useCaseData);
            successResponse(res, userCreation);
        }
        catch (error) {
            failureResponse(res, error);
        }
    }
}