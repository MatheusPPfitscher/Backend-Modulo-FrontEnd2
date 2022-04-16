import { IUseCase } from "../../../../core/domain/contracts/usecase";
import { IUserRepository } from "../../../user/domain/model/user-repository";
import { generateToken } from "../../infra/adapters/token-generation";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

export interface ILoginParams {
    data: {
        email: string,
        password: string;
    };
}

export class LoginUseCase implements IUseCase {
    constructor (
        private userRepository: IUserRepository
    ) { }

    async run(loginParams: ILoginParams) {
        const userTryingToLogin = await this.userRepository.retrieveUserByEmail(loginParams.data.email);
        if (userTryingToLogin !== undefined) {
            if (userTryingToLogin.password === loginParams.data.password) {
                const access_token = generateToken({ userid: userTryingToLogin.userid!, displayName: userTryingToLogin.displayName });
                return {
                    access_token,
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