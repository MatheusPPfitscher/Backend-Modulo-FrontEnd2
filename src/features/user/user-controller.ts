import { Request, Response } from "express";
import { IUser, IUserRepository } from "./user-contracts";

export class UserController {
    constructor (private repository: IUserRepository) { }

    async createUser(req: Request, res: Response) {

        const user: IUser = req.body;
        const result = await this.repository.createUser(user);

        return res.status(result.code).send(result);
    }
}