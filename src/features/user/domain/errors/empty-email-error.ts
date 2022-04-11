import { DomainError } from "../../../../core/domain/errors/domain-error";

export class EmptyEmailError extends DomainError {
    constructor () {
        super("Email invalido.", 400);
        this.name = "EmptyEmailError";
    }
}