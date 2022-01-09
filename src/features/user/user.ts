import { INote } from "../note/note";

export interface IUser {
    username: string;
    password: string;
    notes: INote[];
    token?: string;
}
