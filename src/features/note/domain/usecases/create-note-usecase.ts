import { IUseCase } from "../../../../core/domain/contracts/usecase";
import { User } from "../../../../core/infra/database/entities/User";
import { UserRepository } from "../../../../core/infra/database/repositories/db-user-repository";
import { NoteRepository } from "../../infra/repositories/db-note-repository";
import { UserNotFoundError } from "../errors/user-not-found-error";
import { INote } from "../model/note";

export interface ICreateNoteParams {
    userId: number,
    noteData: INote;
}

export class CreateNoteUseCase implements IUseCase {
    constructor (private userRepository: UserRepository,
        private noteRepository: NoteRepository) { }

    async run(data: ICreateNoteParams) {
        const user: User | undefined = await this.userRepository.retrieveUserById(data.userId);
        if (user !== undefined) {
            const noteEntity = await this.noteRepository.createNote(user, data.noteData);
            return noteEntity;
        } else throw new UserNotFoundError();
    }
}