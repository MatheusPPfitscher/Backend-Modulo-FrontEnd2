import { DomainError } from "../../../../core/domain/errors/domain-error";
import { PASSWORD_LENGTH } from "../contracts/user-limits";

export class PasswordLengthError extends DomainError {
    constructor () {
        super(`Senha excede ${PASSWORD_LENGTH} caracteres.`, 400);
        this.name = "PasswordLengthError";
    }
}