import { UserRepository } from "../../src/core/infra/database/repositories/db-user-repository";
import { IUser } from "../../src/features/user/domain/model/user";

export const signUpTestUser = async (userdata: IUser) => {
    const userRepo = new UserRepository();
    const result = await userRepo.createUser(userdata);
    return result;
};