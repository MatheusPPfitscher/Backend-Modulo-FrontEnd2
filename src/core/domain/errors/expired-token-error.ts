import { DomainError } from "./domain-error";

export class ExpiredTokenError extends DomainError {
    constructor () {
        super("Invalid or Expired Token", 401);
        this.name = "ExpiredTokenError";
    }
}