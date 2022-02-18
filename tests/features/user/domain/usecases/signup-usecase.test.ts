import { DatabaseConnection } from "../../../../../src/core/infra/database/connections/connection";
import { RedisConnection } from "../../../../../src/core/infra/database/connections/redis";
import { UserRepository } from "../../../../../src/core/infra/database/repositories/db-user-repository";
import { CacheRepository } from "../../../../../src/core/infra/database/repositories/redis-cache-repository";
import { UserAlreadyExistsError } from "../../../../../src/features/user/domain/errors/user-already-exists-error";
import { ISignUpParams, SignUpUseCase } from "../../../../../src/features/user/domain/usecases/signup-usecase";
import { signUpTestUser } from "../../../../helpers/signup-user-for-testing";

const makeSut = () => {
    const userRepo = new UserRepository();
    const sut = new SignUpUseCase(userRepo);
    return sut;
};

describe("User feature", () => {
    describe("Sign Up Usecase Integration tests", () => {

        beforeAll(async () => {
            await DatabaseConnection.initConnection();
            RedisConnection.initConnection();
        });

        beforeEach(async () => {
            const userRepo = new UserRepository();
            await userRepo.clear();

            const cacheRepo = new CacheRepository();
            await cacheRepo.clear();
        });

        afterAll(async () => {
            await DatabaseConnection.closeConnection();
            await RedisConnection.closeConnection();
        });

        test(`When provided with a username that already exists on the database, 
        should throw UserAlreadyExistsError`, async () => {
            const testData: ISignUpParams = {
                username: "teste",
                password: "teste"
            };

            await signUpTestUser(testData);

            const sut = makeSut();

            expect(sut.run(testData)).rejects.toThrowError(UserAlreadyExistsError);
        });

        test(`When provided with a username that is available on the database, 
        should create user on database and return this user object`, async () => {
            const testData: ISignUpParams = {
                username: "teste",
                password: "teste"
            };

            const sut = makeSut();

            const result = await sut.run(testData);

            expect(result.username).toEqual(testData.username);
        });
    });
});