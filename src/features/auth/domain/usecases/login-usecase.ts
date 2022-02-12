import { IUseCase } from "../../../../core/domain/contracts/usecase";
import { IUserRepository } from "../../../user/domain/model/user-repository";
import { generateToken } from "../../infra/adapters/token-generation";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

export interface ILoginParams {
    username: string,
    password: string;
}

export class LoginUseCase implements IUseCase {
    constructor (
        private userRepository: IUserRepository
    ) { }

    async run(data: ILoginParams) {
        const userTryingToLogin = await this.userRepository.retrieveUserByName(data.username);
        if (userTryingToLogin !== undefined) {
            if (userTryingToLogin.password === data.password) {
                const token = generateToken({ userid: userTryingToLogin.userid!, username: data.username });
                return token;
            } else throw new InvalidCredentialsError();
        } else throw new InvalidCredentialsError();
    }
}