"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteRouter = void 0;
const express_1 = require("express");
const note_repository_1 = require("../../core/database/repositories/note-repository");
const user_repository_1 = require("../../core/database/repositories/user-repository");
const middlewares_1 = require("./middlewares");
const note_controller_1 = require("./note-controller");
class NoteRouter {
    static getRoutes() {
        const routes = (0, express_1.Router)();
        const userRepo = new user_repository_1.UserRepository();
        const noteRepo = new note_repository_1.NoteRepository();
        const noteController = new note_controller_1.NoteController(noteRepo, userRepo);
        routes.post("/", middlewares_1.validateTokenRequest, (req, res) => noteController.create(req, res));
        routes.get("/:uid?", middlewares_1.validateTokenRequest, (req, res) => noteController.view(req, res));
        routes.put("/:uid", middlewares_1.validateTokenRequest, (req, res) => noteController.edit(req, res));
        routes.delete("/:uid", middlewares_1.validateTokenRequest, (req, res) => noteController.delete(req, res));
        return routes;
    }
}
exports.NoteRouter = NoteRouter;
