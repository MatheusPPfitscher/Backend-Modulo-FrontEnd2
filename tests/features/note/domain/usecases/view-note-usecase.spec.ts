import { UserRepository } from "../../../../../src/core/infra/database/repositories/db-user-repository";
import { CacheRepository } from "../../../../../src/core/infra/database/repositories/redis-cache-repository";
import { UserNotFoundError } from "../../../../../src/features/note/domain/errors/user-not-found-error";
import { INote } from "../../../../../src/features/note/domain/model/note";
import { IViewNoteParams, ViewNoteUseCase } from "../../../../../src/features/note/domain/usecases/view-note-usecase";
import { IUser } from "../../../../../src/features/user/domain/model/user";

// mock all depedencies
jest.mock("../../../../../src/core/infra/database/repositories/db-user-repository");
jest.mock("../../../../../src/core/infra/database/repositories/redis-cache-repository");

// set correct types for mocked classes/functions
const UserRepositoryMock = UserRepository as jest.MockedClass<typeof UserRepository>;
const CacheRepositoryMock = CacheRepository as jest.MockedClass<typeof CacheRepository>;

const makeSut = () => {
    const userRepo = new UserRepositoryMock();
    const cacheRepo = new CacheRepositoryMock();
    const sut = new ViewNoteUseCase(userRepo, cacheRepo);
    return sut;
};

describe("View Note Usecase Unit tests", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    test(`When userid provided dont exist and note id is not provided, 
        should throw UserNotFoundError after UserRepository return undefined`, () => {
        const testData: IViewNoteParams = {
            userid: 0
        };

        // All methods return undefined by default when mocked, no change required

        const sut = makeSut();

        expect(sut.run(testData)).rejects.toThrowError(UserNotFoundError);
    });

    test(`When provided with userid and note id, if cacheRepository.retrieve returns an object for that note,
        should return this object`, async () => {
        const testData: IViewNoteParams = {
            userid: 0,
            noteid: "teste"
        };

        const cacheCallString = `note:${testData.noteid}`;

        const fakeNote: INote = {
            id: "teste",
            title: "teste",
            details: "grande teste"
        };

        CacheRepositoryMock.prototype.retrieve.mockResolvedValue(fakeNote);

        const sut = makeSut();

        const result = await sut.run(testData);

        expect(result).toMatchObject([fakeNote]);
        expect(CacheRepositoryMock.prototype.retrieve).toHaveBeenCalledWith(cacheCallString);
        expect(CacheRepositoryMock.prototype.retrieve).toHaveBeenCalledTimes(1);
        expect(UserRepositoryMock.prototype.retrieveUserById).not.toHaveBeenCalled();
    });

    test(`When provided only with userid, if cacheRepository.retrieve returns an array for that user,
        should return this array`, async () => {
        const testData: IViewNoteParams = {
            userid: 0
        };

        const cacheCallString = `user:${testData.userid}:notes`;

        const fakeNote: INote = {
            id: "teste",
            title: "teste",
            details: "grande teste"
        };

        const fakeCacheResult = [fakeNote, fakeNote, fakeNote];

        CacheRepositoryMock.prototype.retrieve.mockResolvedValue(fakeCacheResult);

        const sut = makeSut();

        const result = await sut.run(testData);

        expect(result).toMatchObject(fakeCacheResult);
        expect(CacheRepositoryMock.prototype.retrieve).toHaveBeenCalledWith(cacheCallString);
        expect(CacheRepositoryMock.prototype.retrieve).toHaveBeenCalledTimes(1);
        expect(UserRepositoryMock.prototype.retrieveUserById).not.toHaveBeenCalled();
    });

    test(`When provided with userid and note id, if there no return from cache for both, if UserRepository returns  
        a valid user, should return an array with only the note that matches the noteid provided`, async () => {
        const testData: IViewNoteParams = {
            userid: 0,
            noteid: "teste"
        };

        const fakeNoteOne: INote = {
            id: "teste",
            title: "teste",
            details: "grande teste"
        };

        const fakeNoteTwo: INote = {
            id: "teste2",
            title: "teste2",
            details: "grande teste 2"
        };

        const fakeNotes: INote[] = [fakeNoteOne, fakeNoteTwo];

        const fakeUser: IUser = {
            userid: 0,
            displayName: "UsuarioTeste",
            email: "teste@teste",
            notes: fakeNotes
        };

        UserRepositoryMock.prototype.retrieveUserById.mockResolvedValue(fakeUser);

        const sut = makeSut();

        const result = await sut.run(testData);

        expect(result).toMatchObject([fakeNoteOne]);
        expect(UserRepositoryMock.prototype.retrieveUserById).toHaveBeenCalled();
    });

    test(`When provided with only userid, if there no return from cache for both, if UserRepository returns  
        a valid user object, should return ther user.notes array`, async () => {
        const testData: IViewNoteParams = {
            userid: 0
        };

        const fakeNoteOne: INote = {
            id: "teste",
            title: "teste",
            details: "grande teste",
            created_at: new Date("2022-02-16")
        };

        const fakeNoteTwo: INote = {
            id: "teste2",
            title: "teste2",
            details: "grande teste 2",
            created_at: new Date("2022-02-15")
        };

        const fakeNotes: INote[] = [fakeNoteTwo, fakeNoteOne];

        const fakeUser: IUser = {
            userid: 0,
            displayName: "UsuarioTeste",
            email: "teste@teste",
            notes: fakeNotes
        };

        UserRepositoryMock.prototype.retrieveUserById.mockResolvedValue(fakeUser);

        const sut = makeSut();

        const result = await sut.run(testData);

        expect(result).toEqual(fakeNotes);
        expect(UserRepositoryMock.prototype.retrieveUserById).toHaveBeenCalled();
    });
});