import { DatabaseConnection } from "../../../../../src/core/infra/database/connections/connection";
import { RedisConnection } from "../../../../../src/core/infra/database/connections/redis";
import { UserRepository } from "../../../../../src/core/infra/database/repositories/db-user-repository";
import { CacheRepository } from "../../../../../src/core/infra/database/repositories/redis-cache-repository";
import { UserNotFoundError } from "../../../../../src/features/note/domain/errors/user-not-found-error";
import { CreateNoteUseCase, ICreateNoteParams } from "../../../../../src/features/note/domain/usecases/create-note-usecase";
import { NoteRepository } from "../../../../../src/features/note/infra/repositories/db-note-repository";
import { IUser } from "../../../../../src/features/user/domain/model/user";
import { signUpTestUser } from "../../../../helpers/signup-user-for-testing";


const makeSut = () => {
    const useRepo = new UserRepository();
    const noteRepo = new NoteRepository();
    const cacheRepository = new CacheRepository();
    const sut = new CreateNoteUseCase(useRepo, noteRepo, cacheRepository);
    return sut;
};

describe("Note feature", () => {
    describe("Create Note Usecase Integration tests", () => {

        beforeAll(async () => {
            await DatabaseConnection.initConnection();
            RedisConnection.initConnection();
        });

        beforeEach(async () => {
            const userRepo = new UserRepository();
            await userRepo.clear();

            const cacheRepo = new CacheRepository();
            await cacheRepo.clear();

            const noteRepo = new NoteRepository();
            await noteRepo.clear();
        });

        afterAll(async () => {
            await DatabaseConnection.closeConnection();
            await RedisConnection.closeConnection();
        });

        test("Should return complete INote from database when provided with a valid INote object", async () => {
            const testUserData: IUser = {
                username: "teste",
                password: "teste"
            };

            const testUser = await signUpTestUser(testUserData);

            const testNoteData: ICreateNoteParams = {
                userid: testUser.userid!,
                title: "Nota de Teste",
                details: "Detalhes da nota de teste"
            };

            const sut = makeSut();

            const result = await sut.run(testNoteData);
            console.log(result);
            expect(result.uid).toBeTruthy();
        });
    });
});