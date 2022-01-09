import { ILogin, ILogon } from "./logon";
import { IUser } from "./user";

export interface IUserRepository {
    create(user: IUser): Promise<void>;
    validateLogin(loginInfo: ILogin): Promise<ILogon>;
}
