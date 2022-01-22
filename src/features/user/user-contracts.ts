import { User } from "../../core/database/entities/User";
import { ILogin, ILogon } from "../auth/auth-contracts";

export interface IUser {
    username: string;
    password: string;
}

export interface IUserRepository {
    retrieveUserByName(username: string): Promise<User | undefined>;
    retrieveUserById(userid: number): Promise<User | undefined>;
    createUser(user: IUser): Promise<string>;
    validateLogin(userLogin: ILogin): Promise<ILogon>;
}