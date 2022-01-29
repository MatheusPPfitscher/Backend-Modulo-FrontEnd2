import { IUser } from "../../../user/domain/model/user";

export interface INote {
    uid?: string;
    title: string,
    details: string;
    created_at?: Date;
}