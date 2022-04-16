import { IUseCase } from "../../../../core/domain/contracts/usecase";
import { ICacheRepository } from "../../../../core/domain/model/cache-repository";
import { INoteRepository } from "../model/note-repository";

export interface IEditNoteParams {
    id: string;
    title: string;
    details: string;
}

export class EditNoteUseCase implements IUseCase {
    constructor (private noteRepository: INoteRepository,
        private cacheRepository: ICacheRepository) { }

    async run(data: IEditNoteParams) {
        const result = this.noteRepository.editNote(data);
        await this.cacheRepository.save(`note:${data.id}`, data);
        this.cacheRepository.setRefreshing(true);
        return result;
    }
}