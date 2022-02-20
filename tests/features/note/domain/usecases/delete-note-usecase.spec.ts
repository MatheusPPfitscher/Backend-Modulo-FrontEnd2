import { UserRepository } from "../../../../../src/core/infra/database/repositories/db-user-repository";
import { CacheRepository } from "../../../../../src/core/infra/database/repositories/redis-cache-repository";
import { NoteRepository } from "../../../../../src/features/note/infra/repositories/db-note-repository";
import { DeleteNoteUseCase, IDeleteNoteParams } from "../../../../../src/features/note/domain/usecases/delete-note-usecase";

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
    describe("Delete Note Usecase Unit tests", () => {
        test("Should call noteRepository.removeNote with testData and return result from noteRepository", async () => {
            const testData: IDeleteNoteParams = {
                uid: "test-uid"
            };

            NoteRepositoryMock.prototype.removeNote.mockResolvedValue({ affected: 1 });
            const sut = makeSut();

            const result = await sut.run(testData);

            expect(result).toMatchObject({ affected: 1 });
        });

        test("Should call cacheRepository.save and .setRefreshing(true) after noteRepository.editNote", async () => {
            const testData: IDeleteNoteParams = {
                uid: "test-uid"
            };

            const sut = makeSut();

            await sut.run(testData);

            expect(CacheRepositoryMock.prototype.delete).toBeCalled();
            expect(CacheRepositoryMock.prototype.setRefreshing).toBeCalledWith(true);
        });
    });
});