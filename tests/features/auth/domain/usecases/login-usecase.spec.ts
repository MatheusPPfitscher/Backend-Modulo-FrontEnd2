import { UserRepository } from "../../../../../src/core/infra/database/repositories/db-user-repository";
import { InvalidCredentialsError } from "../../../../../src/features/auth/domain/errors/invalid-credentials-error";
import { ILoginParams, LoginUseCase } from "../../../../../src/features/auth/domain/usecases/login-usecase";
import { generateToken } from "../../../../../src/features/auth/infra/adapters/token-generation";
import { IUser } from "../../../../../src/features/user/domain/model/user";

// mock all depedencies
jest.mock("../../../../../src/core/infra/database/repositories/db-user-repository");
jest.mock("../../../../../src/features/auth/infra/adapters/token-generation");

// set correct types for mocked classes/functions
const UserRepositoryMock = UserRepository as jest.MockedClass<typeof UserRepository>;
const generateTokenMock = generateToken as jest.MockedFunction<typeof generateToken>;

const makeSut = () => {
    const userRepo = new UserRepositoryMock();
    const sut = new LoginUseCase(userRepo);
    return sut;
};


describe("Login Usecase Unit tests", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("Should throw InvalidCredentialsError when the displayName provided could not be found by the Repository", () => {
        const testData: ILoginParams = {
            displayName: "teste",
            password: "teste"
        };
        const sut = makeSut();
        expect.assertions(1);
        expect(sut.run(testData)).rejects.toThrowError(InvalidCredentialsError);
    });

    test("Should throw InvalidCredentialsError when the password provided do not match for the user found by the Repository", () => {
        const testData: ILoginParams = {
            displayName: "teste",
            password: "OutroTeste"
        };

        const sut = makeSut();

        UserRepositoryMock.prototype.retrieveUserByName.mockResolvedValue({
            displayName: "teste",
            password: "teste",
            email: "teste@teste",
            userid: 0,
            notes: []
        });

        expect.assertions(1);
        expect(sut.run(testData)).rejects.toThrowError(InvalidCredentialsError);
    });

    test("Should call the generateToken function and return a token when displayName and password provided match the UserRepository output", async () => {
        const testData: ILoginParams = {
            displayName: "teste",
            password: "OutroTeste"
        };

        const stubReturn: IUser = {
            ...testData,
            userid: 0,
            email: "teste@teste",
            notes: []
        };

        const sut = makeSut();

        UserRepositoryMock.prototype.retrieveUserByName.mockResolvedValue(stubReturn);
        generateTokenMock.mockReturnValue("Silly Token");

        const result = await sut.run(testData);

        expect(result).toEqual("Silly Token");

        expect(generateToken).toBeCalledWith({
            userid: stubReturn.userid,
            displayName: stubReturn.displayName
        });
    });
});
