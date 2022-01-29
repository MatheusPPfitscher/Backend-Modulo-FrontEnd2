import { IUseCase } from "../../../../core/domain/contracts/usecase";
import { NoteRepository } from "../../infra/repositories/db-note-repository";
import { NoteNotFoundError } from "../errors/note-not-found-error";
import { INote } from "../model/note";

export interface IEditNoteParams {
    noteUid: string;
    noteData: INote;
}

export class EditNoteUseCase implements IUseCase {
    constructor (private noteRepository: NoteRepository) { }

    async run(data: IEditNoteParams) {
        if (data.noteUid) {
            const result = this.noteRepository.editNote(data.noteUid, data.noteData);
            return result;
        } else throw new NoteNotFoundError();
    }
}