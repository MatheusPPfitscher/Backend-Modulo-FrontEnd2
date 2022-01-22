"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenRequest = exports.extractTokenFromHeader = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = require("../../core/presentation/server");
function extractTokenFromHeader(authHeader) {
    return authHeader.split(" ")[1];
}
exports.extractTokenFromHeader = extractTokenFromHeader;
const validateTokenRequest = function (req, res, next) {
    const authHeader = req.headers.authorization;
    try {
        const token = extractTokenFromHeader(authHeader);
        let data = jsonwebtoken_1.default.verify(token, server_1.SECRET);
        res.locals.userId = data.userId;
        next();
    }
    catch {
        return res.status(400).send({
            msg: "ExpiredToken"
        });
    }
};
exports.validateTokenRequest = validateTokenRequest;
