import { IUser } from "../../../user/domain/model/user";
import { INote } from "./note";

export interface INoteRepository {
    createNote(user: IUser, noteData: INote): Promise<Object>;
    editNote(noteUid: string, note: INote): Promise<Object>;
    removeNote(noteUid: string): Promise<Object>;
}