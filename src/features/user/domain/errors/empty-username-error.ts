import { DomainError } from "../../../../core/domain/errors/domain-error";

export class InvalidUsernameError extends DomainError {
    constructor () {
        super("Nome de usuário invalido.", 400);
        this.name = "InvalidUsernameError";
    }
}