import { User } from "../../core/database/entities/User";

export interface INote {
    uid?: string;
    title: string,
    details: string;
    created_at?: Date;
}

export interface INoteRepository {
    addNote(user: User, noteData: INote): Promise<Boolean>;
    viewNote(user: User, noteUid?: string): Promise<INote[]>;
    editNote(noteUid: string, note: INote): Promise<Boolean>;
    removeNote(noteUid: string): Promise<Boolean>;
}