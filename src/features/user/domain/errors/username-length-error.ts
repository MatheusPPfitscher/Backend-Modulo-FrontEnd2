import { DomainError } from "../../../../core/domain/errors/domain-error";
import { USERNAME_LENGTH } from "../contracts/user-limits";

export class UsernameLengthError extends DomainError {
    constructor () {
        super(`Username excede ${USERNAME_LENGTH} caracteres.`, 400);
        this.name = "UsernameLengthError";

    }
}