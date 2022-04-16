import { IUser } from "../../../user/domain/model/user";

export interface INote {
    id?: string;
    title: string,
    details: string;
    created_at?: Date;
}