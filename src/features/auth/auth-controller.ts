import { Request, Response } from "express";
import { ILogin } from "../auth/auth-contracts";
import { IUserRepository } from "../user/user-contracts";

export class AuthController {
    constructor (private repository: IUserRepository) { }

    async logon(req: Request, res: Response) {
        const loginTry: ILogin = req.body;
        if (loginTry) {
            const result = await this.repository.validateLogin(loginTry);
            return res.status(result.code).send(result);
        } else return res.status(400).send({
            msg: "EmptyLoginInfo",
            data: {}
        });
    }
}