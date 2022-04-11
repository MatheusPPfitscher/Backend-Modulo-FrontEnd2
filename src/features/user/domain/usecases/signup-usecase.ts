import { IUseCase } from "../../../../core/domain/contracts/usecase";
import { UserRepository } from "../../../../core/infra/database/repositories/db-user-repository";
import { EMAIL_MAX_LENGTH, PASSWORD_LENGTH, displayName_LENGTH } from "../contracts/user-limits";
import { displayNameLengthError } from "../errors/displayname-length-error";
import { PasswordLengthError } from "../errors/password-length-error";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";


export interface ISignUpParams {
    displayName: string;
    password: string;
    email: string;
}

export class SignUpUseCase implements IUseCase {
    constructor (
        private userRepository: UserRepository
    ) { }

    async run(data: ISignUpParams) {

        if (data.displayName.length > displayName_LENGTH) {
            throw new displayNameLengthError();
        }

        if (data.password.length > PASSWORD_LENGTH) {
            throw new PasswordLengthError();
        }

        if (data.email.length > EMAIL_MAX_LENGTH) {
            throw new PasswordLengthError();
        }

        const existingUser = await this.userRepository.retrieveUserByName(data.displayName);
        if (existingUser !== undefined) {
            throw new UserAlreadyExistsError();
        }

        const newUser = this.userRepository.createUser(data);
        return {user: newUser};
    }
}