import { Repository } from "typeorm";
import { ILogin } from "../../../features/auth/auth-contracts";
import { IUser, IUserRepository } from "../../../features/user/user-contracts";
import { IRequestResult } from "../../presentation/contracts";
import { generateToken } from "../../presentation/helpers";
import { DatabaseConnection } from "../connections/connection";
import { User } from "../entities/User";

export class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor () {
        this.repository = DatabaseConnection.getConnection().manager.getRepository(User);
    }

    async retrieveUser(username: string): Promise<User | undefined> {
        try {
            const result = await this.repository.findOneOrFail({ username: username });
            return result;
        }
        catch {
            return undefined;
        }
    }

    async createUser(userFormulary: IUser): Promise<IRequestResult> {
        try {
            if (userFormulary.username) {
                const user = await this.retrieveUser(userFormulary.username);
                if (user) {
                    return { code: 400, msg: "UsernameUnavailable", data: {} };
                } else {
                    const userEntity = this.repository.create(userFormulary);
                    await this.repository.save(userEntity);
                    return { code: 201, msg: "UserCreated", data: {} };
                }
            } else return { code: 400, msg: "EmptyUsername", data: {} };

        }
        catch (error) {
            console.log(error);
            return { code: 500, msg: "ServerError", data: { error } };
        }
    }

    async validateLogin(userLogin: ILogin): Promise<IRequestResult> {
        const user = await this.retrieveUser(userLogin.username);
        if (user) {
            if (userLogin.password === user.password) {
                const token = generateToken(userLogin);
                return {
                    code: 200,
                    msg: "SuccessfulLogon",
                    data: { token: token }
                };
            }
            else {
                return {
                    code: 403,
                    msg: "FailedLogon",
                    data: {}
                };
            }
        }
        else {
            return {
                code: 403,
                msg: "FailedLogon",
                data: {}
            };
        }
    }
}