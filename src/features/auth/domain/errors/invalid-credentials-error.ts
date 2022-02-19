import { DomainError } from "../../../../core/domain/errors/domain-error";

export class InvalidCredentialsError extends DomainError {
    constructor () {
        super("invalid credentials provided.", 409);
        this.name = "InvalidCredentialsError";
    }
}
