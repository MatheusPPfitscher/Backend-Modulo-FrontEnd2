"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const user_repository_1 = require("../../core/database/repositories/user-repository");
const auth_controller_1 = require("./auth-controller");
class AuthRouter {
    static getRoutes() {
        const routes = (0, express_1.Router)();
        const userRepository = new user_repository_1.UserRepository();
        const authController = new auth_controller_1.AuthController(userRepository);
        routes.post("/", (req, res) => authController.login(req, res));
        return routes;
    }
}
exports.AuthRouter = AuthRouter;
