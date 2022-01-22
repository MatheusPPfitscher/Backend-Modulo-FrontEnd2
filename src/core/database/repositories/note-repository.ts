import { Repository } from "typeorm";
import { INote, INoteRepository } from "../../../features/note/note-contracts";
import { DatabaseConnection } from "../connections/connection";
import { Note } from "../entities/Note";
import { User } from "../entities/User";

export class NoteRepository implements INoteRepository {
    private repository: Repository<Note>;

    constructor () {
        this.repository = DatabaseConnection.getConnection().manager.getRepository(Note);
    }

    async addNote(user: User, noteData: INote): Promise<Boolean> {
        const noteEntity = this.repository.create(noteData);
        noteEntity.user = user;
        try {
            await this.repository.save(noteEntity);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }

    }

    async viewNote(user: User, noteUid?: string): Promise<INote[]> {
        console.log(user);
        let notes: Note[] = [];
        if (noteUid) {
            for (let note of user.notes) {
                if (note.uid === noteUid)
                    notes.push(note);
            }
        } else {
            notes = user.notes;
            notes.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
        }
        return notes;
    }

    async editNote(noteUid: string, noteData: INote): Promise<Boolean> {
        try {
            console.log(noteUid);
            console.log(noteData);
            let result = await this.repository.update({ uid: noteUid }, noteData);
            console.log(result);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    async removeNote(noteUid: string): Promise<Boolean> {
        try {
            const result = await this.repository.delete(noteUid);
            if (result.affected) return true;
            return false;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}