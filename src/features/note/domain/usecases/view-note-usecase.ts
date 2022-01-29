import { IUseCase } from "../../../../core/domain/contracts/usecase";
import { Note } from "../../../../core/infra/database/entities/Note";
import { UserRepository } from "../../../../core/infra/database/repositories/db-user-repository";
import { UserNotFoundError } from "../errors/user-not-found-error";

export interface IViewNoteParams {
    userId: number;
    noteUid?: string;
}
export class ViewNoteUseCase implements IUseCase {
    constructor (private userRepository: UserRepository) {

    }

    async run(data: IViewNoteParams) {
        const user = await this.userRepository.retrieveUserById(data.userId);
        if (user !== undefined) {
            let resultingNotes: Note[] = [];
            if (data.noteUid) {
                for (let note of user.notes) {
                    if (note.uid === data.noteUid)
                        resultingNotes.push(note);
                }
            } else {
                resultingNotes = user.notes;
                resultingNotes.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
            }
            return resultingNotes;
        } else throw new UserNotFoundError();
    }
}