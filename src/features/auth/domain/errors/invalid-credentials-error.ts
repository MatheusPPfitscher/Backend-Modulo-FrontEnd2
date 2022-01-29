import { DomainError } from "../../../../core/domain/errors/domain-error";

export class InvalidCredentialsError extends DomainError {
    constructor () {
        super("InvalidLogin", 409);
        this.name = "InvalidCredentialsError";
    }
}
