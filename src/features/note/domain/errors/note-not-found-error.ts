import { DomainError } from "../../../../core/domain/errors/domain-error";

export class NoteNotFoundError extends DomainError {
    constructor () {
        super("NoteNotFound", 404);
        this.name = "NoteNotFoundError";
    }
}