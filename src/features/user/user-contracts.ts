import { User } from "../../core/database/entities/User";
import { IRequestResult } from "../../core/presentation/contracts";
import { ILogin } from "../auth/auth-contracts";
import { INote } from "../note/note-contracts";

export interface IUser {
    userid: number;
    username: string;
    password: string;
    notes: INote[];
}

export interface IUserRepository {
    retrieveUser(username: string): Promise<User | undefined>;
    createUser(user: IUser): Promise<IRequestResult>;
    validateLogin(userLogin: ILogin): Promise<IRequestResult>;
}