import { IUseCase } from "../../../../core/domain/contracts/usecase";
import { ICacheRepository } from "../../../../core/domain/model/cache-repository";
import { IUserRepository } from "../../../user/domain/model/user-repository";
import { UserNotFoundError } from "../errors/user-not-found-error";
import { INote } from "../model/note";

export interface IViewNoteParams {
    userId: number;
    noteUid?: string;
}
export class ViewNoteUseCase implements IUseCase {
    constructor (private userRepository: IUserRepository,
        private cacheRepository: ICacheRepository) {

    }

    async run(data: IViewNoteParams) {
        if (data.noteUid) {
            let noteCached = await this.cacheRepository.retrieve(`note:${data.noteUid}`);
            if (noteCached) {
                return [noteCached];
            }
        }
        let allCachedNotesFromUser = await this.cacheRepository.retrieve(`user:${data.userId}:notes`);
        if (allCachedNotesFromUser) {
            if (!this.cacheRepository.needRefreshing()) {
                return allCachedNotesFromUser;
            }
        }

        const user = await this.userRepository.retrieveUserById(data.userId);
        if (user !== undefined) {
            let resultingNotes: INote[] = [];
            if (data.noteUid) {
                let retrievedNote = user.notes!.find(note => note.uid === data.noteUid);
                if (retrievedNote) {
                    resultingNotes.push(retrievedNote);
                }
            } else {
                resultingNotes = user.notes!;
                if (resultingNotes.length > 1) {
                    resultingNotes.sort((a, b) => a.created_at!.getTime() - b.created_at!.getTime());
                }
            }
            await this.cacheRepository.save(`user:${data.userId}:notes`, resultingNotes);
            this.cacheRepository.setRefreshing(false);
            return resultingNotes;
        } else throw new UserNotFoundError();
    }
}