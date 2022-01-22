"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const connection_1 = require("../connections/connection");
const User_1 = require("../entities/User");
const adapters_1 = require("../adapters");
class UserRepository {
    constructor() {
        this.repository = connection_1.DatabaseConnection.getConnection().manager.getRepository(User_1.User);
    }
    async retrieveUserByName(username) {
        const result = await this.repository.findOne({ username });
        return result;
    }
    async retrieveUserById(userid) {
        const result = await this.repository.findOne({
            where: { userid: userid, },
            relations: ["notes"]
        });
        return result;
    }
    async createUser(userFormulary) {
        try {
            if (!userFormulary.username.length) {
                return "EmptyUsername";
            }
            else {
                const user = await this.retrieveUserByName(userFormulary.username);
                if (user !== undefined)
                    return "UsernameUnavailable";
                else {
                    const userEntity = this.repository.create(userFormulary);
                    await this.repository.save(userEntity);
                    return "UserCreated";
                }
            }
        }
        catch (error) {
            console.log(error);
            return "ServerError";
        }
    }
    async validateLogin(userLogin) {
        const user = await this.retrieveUserByName(userLogin.username);
        if (user) {
            if (userLogin.password === user.password) {
                const payload = { userid: user.userid, username: user.username };
                const token = (0, adapters_1.generateToken)(payload);
                return { result: true, token: token };
            }
            else
                return { result: false };
        }
        else
            return { result: false };
    }
}
exports.UserRepository = UserRepository;
