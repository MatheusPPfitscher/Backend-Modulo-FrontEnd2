import { DomainError } from "../../../../core/domain/errors/domain-error";

export class UserAlreadyExistsError extends DomainError {
    constructor () {
        super("Usuário já existe.", 409);
        this.name = "UserAlreadyExistsError";
    }
}