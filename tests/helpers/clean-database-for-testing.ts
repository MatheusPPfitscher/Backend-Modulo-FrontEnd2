import { UserRepository } from "../../src/core/infra/database/repositories/db-user-repository";
import { NoteRepository } from "../../src/features/note/infra/repositories/db-note-repository";
import { CacheRepository } from "../../src/core/infra/database/repositories/redis-cache-repository";
declare module "../../src/core/infra/database/repositories/db-user-repository" {
    export interface UserRepository {
        clear(): void;
    }
}
declare module "../../src/features/note/infra/repositories/db-note-repository" {
    export interface NoteRepository {
        clear(): void;
    }
}
declare module "../../src/core/infra/database/repositories/redis-cache-repository" {
    export interface CacheRepository {
        clear(): void;
    }
}

UserRepository.prototype.clear = async function () { await this.repository.clear(); };
NoteRepository.prototype.clear = async function () { await this.repository.clear(); };
CacheRepository.prototype.clear = async function () { await this.redis.flushall(); };

export async function cleanDatabase() {
    const userRepo = new UserRepository();
    await userRepo.clear();

    const noteRepo = new NoteRepository();
    await noteRepo.clear();

    const cacheRepo = new CacheRepository();
    await cacheRepo.clear();
}