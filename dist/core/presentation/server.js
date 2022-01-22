"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = exports.SECRET = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.SECRET = process.env.TOKEN_SECRET;
const initServer = async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    (0, routes_1.enabledRoutes)(app);
    await app.listen(process.env.PORT, () => console.log("Server is running..."));
};
exports.initServer = initServer;
