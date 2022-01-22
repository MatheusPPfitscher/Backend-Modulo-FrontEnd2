"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(repository) {
        this.repository = repository;
    }
    async createUser(req, res) {
        const user = req.body;
        const result = await this.repository.createUser(user);
        if (result === "UserCreated") {
            return res.status(201).send({ msg: "UserCreated" });
        }
        else if (result === "UsernameUnavailable") {
            return res.status(400).send({ msg: "UsernameUnavailable" });
        }
        else {
            return res.status(400).send({ msg: "EmptyUsername" });
        }
    }
}
exports.UserController = UserController;
