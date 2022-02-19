import { UserRepository } from "../../../../../src/core/infra/database/repositories/db-user-repository";
import { CacheRepository } from "../../../../../src/core/infra/database/repositories/redis-cache-repository";
import { UserNotFoundError } from "../../../../../src/features/note/domain/errors/user-not-found-error";
import { CreateNoteUseCase, ICreateNoteParams } from "../../../../../src/features/note/domain/usecases/create-note-usecase";
import { NoteRepository } from "../../../../../src/features/note/infra/repositories/db-note-repository";

// mock all depedencies
jest.mock("../../../../../src/core/infra/database/repositories/db-user-repository");
jest.mock("../../../../../src/features/note/infra/repositories/db-note-repository");
jest.mock("../../../../../src/core/infra/database/repositories/redis-cache-repository");

// set correct types for mocked classes/functions
const UserRepositoryMock = UserRepository as jest.MockedClass<typeof UserRepository>;
const NoteRepositoryMock = NoteRepository as jest.MockedClass<typeof NoteRepository>;
const CacheRepositoryMock = CacheRepository as jest.MockedClass<typeof CacheRepository>;

const makeSut = () => {
    const useRepo = new UserRepositoryMock();
    const noteRepo = new NoteRepositoryMock();
    const cacheRepository = new CacheRepositoryMock();
    const sut = new CreateNoteUseCase(useRepo, noteRepo, cacheRepository);
    return sut;
};

describe("Note feature", () => {
    describe("Create Note Usecase Unit tests", () => {

        beforeEach(() => {
            jest.resetAllMocks();
        });

        it("Should throw UserNotFoundError if userid provided is not found by the UserRepository", () => {
            const testData: ICreateNoteParams = {
                userid: 0,
                title: "Hmmm",
                details: "Ora Ora Ora"
            };

            const sut = makeSut();

            expect(sut.run(testData)).rejects.toThrowError(UserNotFoundError);
        });

        it(`Should call noteRepository.create with user and return result from noteRepository.createNote 
        after userRepository returns a valid user`, async () => {
            const testData: ICreateNoteParams = {
                userid: 0,
                title: "Hmmm",
                details: "Ora Ora Ora"
            };

            const fakeUser = {
                userid: 0,
                username: "teste",
                notes: []
            };

            const fakeNote = {
                uid: "something",
                title: testData.title,
                details: testData.details
            };

            UserRepositoryMock.prototype.retrieveUserById.mockResolvedValue(fakeUser);

            NoteRepositoryMock.prototype.createNote.mockResolvedValue(fakeNote);

            const sut = makeSut();

            const result = await sut.run(testData);

            expect.assertions(1);
            expect(result).toMatchObject(fakeNote);
        });

        it(`Should call cacheRepository.save and .setRefreshing(true) after return fron noteRepository.createNote`, async () => {
            const testData: ICreateNoteParams = {
                userid: 0,
                title: "Hmmm",
                details: "Ora Ora Ora"
            };

            const fakeUser = {
                userid: 0,
                username: "teste",
                notes: []
            };

            const fakeNote = {
                uid: "something",
                title: testData.title,
                details: testData.details
            };

            UserRepositoryMock.prototype.retrieveUserById.mockResolvedValue(fakeUser);

            NoteRepositoryMock.prototype.createNote.mockResolvedValue(fakeNote);

            const sut = makeSut();

            await sut.run(testData);

            expect.assertions(2);
            expect(CacheRepositoryMock.prototype.save).toBeCalled();
            expect(CacheRepositoryMock.prototype.setRefreshing).toBeCalledWith(true);
        });
    });
});