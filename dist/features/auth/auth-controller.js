"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(repository) {
        this.repository = repository;
    }
    async login(req, res) {
        const loginTry = req.body;
        const logon = await this.repository.validateLogin(loginTry);
        if (logon.result) {
            return res.status(200).send({ msg: "Logon", token: logon.token });
        }
        else {
            return res.status(403).send({ msg: "invalidLogin" });
        }
    }
}
exports.AuthController = AuthController;
