"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
const typeorm_1 = require("typeorm");
class DatabaseConnection {
    static getConnection() {
        let conn = (0, typeorm_1.getConnection)();
        if (!conn) {
            throw new Error("Database is not connected.");
        }
        return DatabaseConnection._connection;
    }
    static async initConnection() {
        if (!DatabaseConnection._connection) {
            this._connection = await (0, typeorm_1.createConnection)();
        }
    }
}
exports.DatabaseConnection = DatabaseConnection;
