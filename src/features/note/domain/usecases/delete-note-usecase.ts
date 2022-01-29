import { IUseCase } from "../../../../core/domain/contracts/usecase";
import { NoteRepository } from "../../infra/repositories/db-note-repository";
import { NoteNotFoundError } from "../errors/note-not-found-error";

export interface IDeleteNoteParams {
    noteUid: string;
}

export class DeleteNoteUseCase implements IUseCase {
    constructor (private noteRepository: NoteRepository) { }

    async run(data: IDeleteNoteParams) {
        if (data.noteUid) {
            const result = this.noteRepository.removeNote(data.noteUid);
            return result;
        } else throw new NoteNotFoundError();
    }
}