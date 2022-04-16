import { User } from "../../../../core/infra/database/entities/User";
import { IUser } from "./user";

export interface IUserRepository {
    retrieveUserByEmail(email: string): Promise<IUser | undefined>;
    retrieveUserById(userid: number): Promise<IUser | undefined>;
    createUser(user: IUser): Promise<IUser>;
}