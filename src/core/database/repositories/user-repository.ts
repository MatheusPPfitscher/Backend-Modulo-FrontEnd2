import { Repository } from "typeorm";
import { ILogin, ILogon, IPayload } from "../../../features/auth/auth-contracts";
import { IUser, IUserRepository } from "../../../features/user/user-contracts";
import { DatabaseConnection } from "../connections/connection";
import { User } from "../entities/User";
import { generateToken } from "../adapters";

export class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor () {
        this.repository = DatabaseConnection.getConnection().manager.getRepository(User);
    }

    async retrieveUserByName(username: string): Promise<User | undefined> {
        const result = await this.repository.findOne({ username });
        return result;
    }

    async retrieveUserById(userid: number): Promise<User | undefined> {
        const result = await this.repository.findOne(
            {
                where: { userid: userid, },
                relations: ["notes"]
            });
        return result;
    }

    async createUser(userFormulary: IUser): Promise<string> {
        try {
            if (!userFormulary.username.length) {
                return "EmptyUsername";
            }
            else {
                const user = await this.retrieveUserByName(userFormulary.username);
                if (user !== undefined) return "UsernameUnavailable";
                else {
                    const userEntity = this.repository.create(userFormulary);
                    await this.repository.save(userEntity);
                    return "UserCreated";
                }
            }
        }
        catch (error) {
            console.log(error);
            return "ServerError";
        }
    }

    async validateLogin(userLogin: ILogin): Promise<ILogon> {
        const user = await this.retrieveUserByName(userLogin.username);
        if (user) {
            if (userLogin.password === user.password) {
                const payload: IPayload = { userid: user.userid, username: user.username };
                const token = generateToken(payload);
                return { result: true, token: token };
            } else return { result: false };
        } else return { result: false };
    }
}