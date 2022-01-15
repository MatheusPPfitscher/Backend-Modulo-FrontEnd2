import { Repository } from "typeorm";
import { INote, INoteRepository } from "../../../features/note/note-contracts";
import { DatabaseConnection } from "../connections/connection";
import { Note } from "../entities/Note";

export class NoteRepository implements INoteRepository {
    private repository: Repository<Note>;

    constructor () {
        this.repository = DatabaseConnection.getConnection().manager.getRepository(Note);
    }

    async addNote(username: string, note: INote): Promise<string> {

    }

    async editNote(username: string, noteUid: string, note: INote): Promise<string> {

    }

    async removeNote(username: string, noteUid: string): Promise<string> {

    }
}