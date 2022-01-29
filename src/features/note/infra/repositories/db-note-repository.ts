import { Repository } from "typeorm";
import { DatabaseConnection } from "../../../../core/infra/database/connections/connection";
import { Note } from "../../../../core/infra/database/entities/Note";
import { User } from "../../../../core/infra/database/entities/User";
import { INote } from "../../domain/model/note";
import { INoteRepository } from "../../domain/model/note-repository";

export class NoteRepository implements INoteRepository {
    private repository: Repository<Note>;

    constructor () {
        this.repository = DatabaseConnection.getConnection().manager.getRepository(Note);
    }

    async createNote(user: User, noteData: INote) {
        const noteEntity = this.repository.create(noteData);
        noteEntity.user = user;
        await this.repository.save(noteEntity);
        const result: INote = {
            uid: noteEntity.uid,
            title: noteEntity.title,
            details: noteEntity.details,
            created_at: noteEntity.created_at
        };
        return result;
    }

    async editNote(noteUid: string, noteData: INote) {
        let result = await this.repository.update({ uid: noteUid }, noteData);
        return result;
    }

    async removeNote(noteUid: string) {
        const result = await this.repository.delete(noteUid);
        return result;
    }
}