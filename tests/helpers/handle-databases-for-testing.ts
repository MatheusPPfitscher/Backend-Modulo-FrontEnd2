import { DatabaseConnection } from "../../src/core/infra/database/connections/connection";
import { RedisConnection } from "../../src/core/infra/database/connections/redis";

export async function startDatabases() {
    await DatabaseConnection.initConnection();
    RedisConnection.initConnection();
}

export async function stopDatabases() {
    await DatabaseConnection.closeConnection();
    RedisConnection.closeConnection();
}