import { DomainError } from "../../../../core/domain/errors/domain-error";

export class UserNotFoundError extends DomainError {
    constructor () {
        super("UserNotFound", 404);
        this.name = "UserNotFoundError";
    }
}