"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_repository_1 = require("../../core/database/repositories/user-repository");
const user_controller_1 = require("./user-controller");
class UserRouter {
    static getRoutes() {
        const routes = (0, express_1.Router)();
        const userRepository = new user_repository_1.UserRepository();
        const userController = new user_controller_1.UserController(userRepository);
        routes.post('/', (req, res) => userController.createUser(req, res));
        return routes;
    }
}
exports.UserRouter = UserRouter;
