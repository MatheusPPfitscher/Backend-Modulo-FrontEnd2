import { DomainError } from "../../../../core/domain/errors/domain-error";

export class UserAlreadyExistsError extends DomainError {
    constructor () {
        super("UserAlreadyExists", 409);
        this.name = "UserAlreadyExistsError";
    }
}