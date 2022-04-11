import { DomainError } from "../../../../core/domain/errors/domain-error";
import { displayName_LENGTH } from "../contracts/user-limits";

export class displayNameLengthError extends DomainError {
    constructor () {
        super(`displayName excede ${displayName_LENGTH} caracteres.`, 400);
        this.name = "displayNameLengthError";

    }
}