import { DatabaseConnection } from "../../../../../src/core/infra/database/connections/connection";
import { UserRepository } from "../../../../../src/core/infra/database/repositories/db-user-repository";
import { InvalidCredentialsError } from "../../../../../src/features/auth/domain/errors/invalid-credentials-error";
import { ILoginParams, LoginUseCase } from "../../../../../src/features/auth/domain/usecases/login-usecase";
import { signUpTestUser } from "../../../../helpers/signup-user-for-testing";
import { validateToken } from "../../../../helpers/token-validation-for-testing";

const makeSut = () => {
    const userRepo = new UserRepository();
    const sut = new LoginUseCase(userRepo);
    return sut;
};


describe("Auth feature", () => {
    describe("Login Usecase Integration tests", () => {

        beforeAll(async () => {
            await DatabaseConnection.initConnection();
        });

        beforeEach(async () => {
            const userRepo = new UserRepository();
            await userRepo.clear();

        });

        afterAll(async () => {
            await DatabaseConnection.closeConnection();
        });

        test("When provided with a valid username and password, should return an authentication token", async () => {
            const testData: ILoginParams = {
                username: "teste",
                password: "teste"
            };

            const testUser = await signUpTestUser(testData);

            const sut = makeSut();

            const result = await sut.run(testData);

            const decodedToken = validateToken(result);

            expect(decodedToken.userid).toEqual(testUser.userid);
        });

        test("When provided with a invalid username, should throw InvalidCredentialsError", () => {
            const testData: ILoginParams = {
                username: "testeNonExiste",
                password: "teste"
            };

            const sut = makeSut();

            expect(sut.run(testData)).rejects.toThrowError(InvalidCredentialsError);
        });

        test("When provided with a valid username and wrong password, should throw InvalidCredentialsError", async () => {
            const userData: ILoginParams = {
                username: "testeExiste",
                password: "teste"
            };

            const testUser = await signUpTestUser(userData);

            const testData: ILoginParams = {
                username: "testeExiste",
                password: "senhaErrada"
            };

            const sut = makeSut();

            expect(sut.run(testData)).rejects.toThrowError(InvalidCredentialsError);
        });
    });
});