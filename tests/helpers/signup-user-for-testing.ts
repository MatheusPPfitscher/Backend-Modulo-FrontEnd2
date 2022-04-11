import { UserRepository } from "../../src/core/infra/database/repositories/db-user-repository";
import { IUser } from "../../src/features/user/domain/model/user";
import { faker } from '@faker-js/faker';
import { ISignUpParams } from "../../src/features/user/domain/usecases/signup-usecase";

export const signUpTestUser = async () => {
    const userdata: ISignUpParams = {
        displayName: faker.name.findName(),
        password: faker.internet.password(10),
        email: faker.internet.email()
    };
    const userRepo = new UserRepository();
    const newUser = await userRepo.createUser(userdata);
    return {
        userid: newUser.userid,
        ...userdata
    };
};