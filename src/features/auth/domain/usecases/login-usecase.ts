import { IUseCase } from "../../../../core/domain/contracts/usecase";
import { IUserRepository } from "../../../user/domain/model/user-repository";
import { generateToken } from "../../infra/adapters/token-generation";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

export interface ILoginParams {
    displayName: string,
    password: string;
}

export class LoginUseCase implements IUseCase {
    constructor (
        private userRepository: IUserRepository
    ) { }

    async run(data: ILoginParams) {
        const userTryingToLogin = await this.userRepository.retrieveUserByName(data.displayName);
        if (userTryingToLogin !== undefined) {
            if (userTryingToLogin.password === data.password) {
                const token = generateToken({ userid: userTryingToLogin.userid!, displayName: data.displayName });
                return {
                    token,
                    user: {
                        userid: userTryingToLogin.userid,
                        displayName: userTryingToLogin.displayName,
                        email: userTryingToLogin.email
                    }
                };
            } else throw new InvalidCredentialsError();
        } else throw new InvalidCredentialsError();
    }
}