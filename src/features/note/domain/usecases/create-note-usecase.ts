import { IUseCase } from "../../../../core/domain/contracts/usecase";
import { ICacheRepository } from "../../../../core/domain/model/cache-repository";
import { User } from "../../../../core/infra/database/entities/User";
import { IUserRepository } from "../../../user/domain/model/user-repository";
import { UserNotFoundError } from "../errors/user-not-found-error";
import { INote } from "../model/note";
import { INoteRepository } from "../model/note-repository";

export interface ICreateNoteParams {
    userId: number,
    noteData: INote;
}

export class CreateNoteUseCase implements IUseCase {
    constructor (private userRepository: IUserRepository,
        private noteRepository: INoteRepository,
        private cacheRepository: ICacheRepository) {
    }

    async run(data: ICreateNoteParams) {
        const user: User | undefined = await this.userRepository.retrieveUserById(data.userId);
        if (user !== undefined) {
            const noteEntity = await this.noteRepository.createNote(user, data.noteData);
            await this.cacheRepository.save(`note:${noteEntity.uid}`, noteEntity);
            return noteEntity;
        } else throw new UserNotFoundError();
    }
}