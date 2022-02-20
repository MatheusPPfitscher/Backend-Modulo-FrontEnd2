import { UserRepository } from "../../../../../src/core/infra/database/repositories/db-user-repository";
import { InvalidUsernameError } from "../../../../../src/features/user/domain/errors/empty-username-error";
import { PasswordLengthError } from "../../../../../src/features/user/domain/errors/password-length-error";
import { UserAlreadyExistsError } from "../../../../../src/features/user/domain/errors/user-already-exists-error";
import { UsernameLengthError } from "../../../../../src/features/user/domain/errors/username-length-error";
import { ISignUpParams, SignUpUseCase } from "../../../../../src/features/user/domain/usecases/signup-usecase";

// mock all depedencies
jest.mock("../../../../../src/core/infra/database/repositories/db-user-repository");
const UserRepositoryMock = UserRepository as jest.MockedClass<typeof UserRepository>;

const makeSut = () => {
    const userRepo = new UserRepositoryMock();
    const sut = new SignUpUseCase(userRepo);
    return sut;
};


describe("Sign Up Usecase Unit tests", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("When provided with username, should throw UsernameLengthError if the Username length is exceeded", () => {
        const testData: ISignUpParams = {
            username: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            password: ""
        };

        const sut = makeSut();

        expect(sut.run(testData)).rejects.toThrowError(UsernameLengthError);
    });

    test("When provided username and password, should throw PasswordLengthError if the password length is exceeded", () => {
        const testData: ISignUpParams = {
            username: "teste",
            password: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        };

        const sut = makeSut();
        expect(sut.run(testData)).rejects.toThrowError(PasswordLengthError);
    });

    test(`When provided with a valid IUser object, Should throw UserAlreadyExistsError 
        if the UserRepository returns an object`, async () => {
        const testData: ISignUpParams = {
            username: "teste",
            password: "teste"
        };

        UserRepositoryMock.prototype.retrieveUserByName.mockResolvedValue({
            ...testData,
            userid: 0,
            notes: []
        });

        const sut = makeSut();

        expect.assertions(1);

        expect(sut.run(testData))
            .rejects
            .toThrowError(UserAlreadyExistsError);
    });

    test("Should return an IUser object when provided with a valid IUser object if username is available", async () => {
        const testData: ISignUpParams = {
            username: "teste",
            password: "teste"
        };

        UserRepositoryMock.prototype.createUser.mockResolvedValue({
            username: testData.username,
            userid: 0
        });

        const sut = makeSut();

        expect.assertions(1);

        const result = await sut.run(testData);

        expect(result)
            .toEqual(
                expect.objectContaining({
                    username: testData.username,
                    userid: 0
                }));
    });
});