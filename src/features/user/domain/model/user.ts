import { INote } from "../../../note/domain/model/note";

export interface IUser {
    userid?: number;
    username: string;
    password?: string;
    notes?: INote[];
}