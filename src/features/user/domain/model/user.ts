import { INote } from "../../../note/domain/model/note";

export interface IUser {
    userid?: number;
    displayName: string;
    email: string;
    password?: string;
    notes?: INote[];
}