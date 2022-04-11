import { DomainError } from "../../../../core/domain/errors/domain-error";
import { EMAIL_MAX_LENGTH } from "../contracts/user-limits";

export class EmailLengthError extends DomainError {
    constructor () {
        super(`Email excede ${EMAIL_MAX_LENGTH} caracteres.`, 400);
        this.name = "EmailLengthError";
    }
}