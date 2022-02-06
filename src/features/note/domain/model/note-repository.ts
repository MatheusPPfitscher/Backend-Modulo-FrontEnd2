import { IUser } from "../../../user/domain/model/user";
import { INote } from "./note";

export interface INoteRepository {
    createNote(user: IUser, noteData: INote): Promise<INote>;
    editNote(noteData: INote): Promise<INote>;
    removeNote(noteUid: string): Promise<any>;
}