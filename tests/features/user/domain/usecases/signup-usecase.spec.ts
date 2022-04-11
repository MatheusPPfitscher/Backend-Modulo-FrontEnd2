import { UserRepository } from "../../../../../src/core/infra/database/repositories/db-user-repository";
import { displayNameLengthError } from "../../../../../src/features/user/domain/errors/displayname-length-error";
import { PasswordLengthError } from "../../../../../src/features/user/domain/errors/password-length-error";
import { UserAlreadyExistsError } from "../../../../../src/features/user/domain/errors/user-already-exists-error";
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

    test("When provided with an empty email field, should throw")
    test("When provided with displayName, should throw displayNameLengthError if the displayName length is exceeded", () => {
        const testData: ISignUpParams = {
            displayName: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            password: "",
            email: "teste@teste"
        };

        const sut = makeSut();

        expect(sut.run(testData)).rejects.toThrowError(displayNameLengthError);
    });

    test("When provided displayName and password, should throw PasswordLengthError if the password length is exceeded", () => {
        const testData: ISignUpParams = {
            displayName: "teste",
            password: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            email: "teste@teste"
        };

        const sut = makeSut();
        expect(sut.run(testData)).rejects.toThrowError(PasswordLengthError);
    });

    test(`When provided with a valid IUser object, Should throw UserAlreadyExistsError 
        if the UserRepository returns an object`, async () => {
        const testData: ISignUpParams = {
            displayName: "teste",
            password: "teste",
            email: "teste@teste"
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

    test("Should return an IUser object when provided with a valid IUser object if displayName is available", async () => {
        const testData: ISignUpParams = {
            displayName: "teste",
            password: "teste",
            email: "teste@teste"
        };

        UserRepositoryMock.prototype.createUser.mockResolvedValue({
            displayName: testData.displayName,
            userid: 0,
            email: testData.email
        });

        const sut = makeSut();

        expect.assertions(1);

        const result = await sut.run(testData);

        expect(result)
            .toEqual(
                expect.objectContaining({
                    displayName: testData.displayName,
                    userid: 0
                }));
    });
});