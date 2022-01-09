import { Repository } from "typeorm";
import { ILogon } from "../../../features/user/logon";
import { IUser } from "../../../features/user/user";
import { IUserRepository } from "../../../features/user/user-repository";
import { DatabaseConnection } from "../connections/connection";
import { User } from "../entitites/User";

export class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor () {

    }

    async create(user: IUser) {

    }

    async validateLogin(): Promise<ILogon> {

    }
}