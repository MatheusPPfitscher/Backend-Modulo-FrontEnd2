"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./core/database/connections/connection");
require("reflect-metadata");
const server_1 = require("./core/presentation/server");
connection_1.DatabaseConnection.initConnection()
    .then(() => {
    (0, server_1.initServer)();
})
    .catch((error) => {
    console.log(error);
});
