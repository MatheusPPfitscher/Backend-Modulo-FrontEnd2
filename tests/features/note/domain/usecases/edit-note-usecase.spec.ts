import { CacheRepository } from "../../../../../src/core/infra/database/repositories/redis-cache-repository";
import { NoteRepository } from "../../../../../src/features/note/infra/repositories/db-note-repository";
import { EditNoteUseCase, IEditNoteParams } from "../../../../../src/features/note/domain/usecases/edit-note-usecase";


jest.mock("../../../../../src/features/note/infra/repositories/db-note-repository");
jest.mock("../../../../../src/core/infra/database/repositories/redis-cache-repository");

const NoteRepositoryMock = NoteRepository as jest.MockedClass<typeof NoteRepository>;
const CacheRepositoryMock = CacheRepository as jest.MockedClass<typeof CacheRepository>;

const makeSut = () => {
    const noteRepo = new NoteRepositoryMock();
    const cacheRepository = new CacheRepositoryMock();
    const sut = new EditNoteUseCase(noteRepo, cacheRepository);
    return sut;
};

describe("Note feature", () => {
    describe("Edit Note Usecase Unity tests", () => {

        beforeEach(() => {
            jest.resetAllMocks();
        });

        it("Should call noteRepository.editNote with testData and return result from noteRepository", async () => {
            const testData: IEditNoteParams = {
                uid: "test-uid",
                title: "Something",
                details: "something something"
            };

            NoteRepositoryMock.prototype.editNote.mockResolvedValue(testData);
            const sut = makeSut();

            const result = await sut.run(testData);

            expect(result).toMatchObject(testData);
        });

        it("Should call cacheRepository.save and .setRefreshing(true) after noteRepository.editNote", async () => {
            const testData: IEditNoteParams = {
                uid: "test-uid",
                title: "Something",
                details: "something something"
            };

            const sut = makeSut();

            await sut.run(testData);

            expect(CacheRepositoryMock.prototype.save).toBeCalled();
            expect(CacheRepositoryMock.prototype.setRefreshing).toBeCalledWith(true);
        });
    });
});