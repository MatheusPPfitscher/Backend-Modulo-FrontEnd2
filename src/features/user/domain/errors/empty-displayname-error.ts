import { DomainError } from "../../../../core/domain/errors/domain-error";

export class InvalidDisplayNameError extends DomainError {
    constructor () {
        super("Nome invalido.", 400);
        this.name = "InvaliddisplayNameError";
    }
}