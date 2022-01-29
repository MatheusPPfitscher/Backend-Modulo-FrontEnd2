import { DomainError } from "../../../../core/domain/errors/domain-error";

export class PasswordLengthError extends DomainError {
    constructor () {
        super("Senha excede 36 caracteres.", 400);
        this.name = "PasswordLengthError";

    }
}