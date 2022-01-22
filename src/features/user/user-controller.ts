import { Request, Response } from "express";
import { IUser, IUserRepository } from "./user-contracts";

export class UserController {
    constructor (private repository: IUserRepository) { }

    async createUser(req: Request, res: Response) {
        const user: IUser = req.body;
        const result = await this.repository.createUser(user);
        if (result === "UserCreated") {
            return res.status(201).send({ msg: "UserCreated" });
        } else if (result === "UsernameUnavailable") {
            return res.status(400).send({ msg: "UsernameUnavailable" });
        }
        else { return res.status(400).send({ msg: "EmptyUsername" }); }
    }
}