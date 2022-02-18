import { Redis } from "ioredis";
import { ICacheRepository } from "../../../domain/model/cache-repository";
import { RedisConnection } from "../connections/redis";

export class CacheRepository implements ICacheRepository {
    private readonly redis: Redis;
    private refreshPending: Boolean;

    constructor () {
        this.redis = RedisConnection.getConnection();
    }

    setRefreshing(status: boolean): void {
        this.refreshPending = status;
    }

    needRefreshing(): Boolean {
        return this.refreshPending;
    }

    async save(key: string, data: object): Promise<void> {
        const result = await this.redis.set(key, JSON.stringify(data));
        if (result === null) {
            throw new Error("Set error");
        }
    }

    async retrieve(key: string): Promise<object> {
        const result = await this.redis.get(key);
        return result != null ? JSON.parse(result) : undefined;
    }

    async delete(key: string): Promise<void> {
        const result = await this.redis.del(key);
        if (result === null) {
            throw new Error("Set error");
        }
    }

    async clear() {
        await this.redis.flushall();
    }
}
