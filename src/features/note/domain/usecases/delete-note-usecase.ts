import { IUseCase } from "../../../../core/domain/contracts/usecase";
import { ICacheRepository } from "../../../../core/domain/model/cache-repository";
import { INoteRepository } from "../model/note-repository";

export interface IDeleteNoteParams {
    id: string;
}

export class DeleteNoteUseCase implements IUseCase {
    constructor (private noteRepository: INoteRepository,
        private cacheRepository: ICacheRepository) { }

    async run(data: IDeleteNoteParams) {
        const result = await this.noteRepository.removeNote(data.id);
        await this.cacheRepository.delete(`note:${data.id}`);
        this.cacheRepository.setRefreshing(true);
        return result;
    }
}