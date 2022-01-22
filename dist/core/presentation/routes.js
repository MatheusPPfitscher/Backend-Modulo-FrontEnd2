"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enabledRoutes = void 0;
const auth_routes_1 = require("../../features/auth/auth-routes");
const note_routes_1 = require("../../features/note/note-routes");
const user_routes_1 = require("../../features/user/user-routes");
const middlewares_1 = require("./middlewares");
const enabledRoutes = (app) => {
    app.use('/user', middlewares_1.logRequest, user_routes_1.UserRouter.getRoutes());
    app.use('/auth', middlewares_1.logRequest, auth_routes_1.AuthRouter.getRoutes());
    app.use('/note', middlewares_1.logRequest, note_routes_1.NoteRouter.getRoutes());
};
exports.enabledRoutes = enabledRoutes;
