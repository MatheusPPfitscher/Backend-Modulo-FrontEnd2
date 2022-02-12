import { UserRepository } from "../../../../../src/core/infra/database/repositories/db-user-repository";
import { CacheRepository } from "../../../../../src/core/infra/database/repositories/redis-cache-repository";
import { NoteRepository } from "../../../../../src/features/note/infra/repositories/db-note-repository";
import { DeleteNoteUseCase } from "../../../../../src/features/note/domain/usecases/delete-note-usecase";

// mock all depedencies
jest.mock("../../../../../src/features/note/infra/repositories/db-note-repository");
jest.mock("../../../../../src/core/infra/database/repositories/redis-cache-repository");

// set correct types for mocked classes/functions
const NoteRepositoryMock = NoteRepository as jest.MockedClass<typeof NoteRepository>;
const CacheRepositoryMock = CacheRepository as jest.MockedClass<typeof CacheRepository>;

const makeSut = () => {
    const noteRepo = new NoteRepositoryMock();
    const cacheRepo = new CacheRepositoryMock();
    const sut = new DeleteNoteUseCase(noteRepo, cacheRepo);
    return sut;
};

describe("Note feature", () => {
    describe("Delete Note Usecase tests", () => {
        it("Should set cache Refreshing to true", () => { });
    });
});