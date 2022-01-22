import { Request, Response } from "express";
import { ILogin } from "../auth/auth-contracts";
import { IUserRepository } from "../user/user-contracts";

export class AuthController {
    constructor (private repository: IUserRepository) { }

    async login(req: Request, res: Response) {
        const loginTry: ILogin = req.body;
        const logon = await this.repository.validateLogin(loginTry);
        if (logon.result) {
            return res.status(200).send({ msg: "Logon", token: logon.token });
        } else {
            return res.status(403).send({ msg: "invalidLogin" });
        }
    }
}