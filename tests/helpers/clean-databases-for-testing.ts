import { DatabaseConnection } from "../../src/core/infra/database/connections/connection";
import { RedisConnection } from "../../src/core/infra/database/connections/redis";
import { Note } from "../../src/core/infra/database/entities/Note";
import { User } from "../../src/core/infra/database/entities/User";

export async function clearDatabases() {
    await DatabaseConnection.getConnection().getRepository(Note).clear();
    await DatabaseConnection.getConnection().getRepository(User).clear();
    await RedisConnection.getConnection().flushall();
}
