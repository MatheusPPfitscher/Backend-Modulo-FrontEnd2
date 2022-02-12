import { IUseCase } from "../../../../core/domain/contracts/usecase";
import { UserRepository } from "../../../../core/infra/database/repositories/db-user-repository";
import { PASSWORD_LENGTH, USERNAME_LENGTH } from "../contracts/user-limits";
import { InvalidUsernameError } from "../errors/empty-username-error";
import { PasswordLengthError } from "../errors/password-length-error";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import { UsernameLengthError } from "../errors/username-length-error";

export interface ISignUpParams {
    username: string;
    password: string;
}

export class SignUpUseCase implements IUseCase {
    constructor (
        private userRepository: UserRepository
    ) { }

    async run(data: ISignUpParams) {

        if (data.username.length > USERNAME_LENGTH) {
            throw new UsernameLengthError();
        }

        if (data.password.length > PASSWORD_LENGTH) {
            throw new PasswordLengthError();
        }

        const existingUser = await this.userRepository.retrieveUserByName(data.username);
        if (existingUser !== undefined) {
            throw new UserAlreadyExistsError();
        }

        const newUser = this.userRepository.createUser(data);
        return newUser;
    }
}