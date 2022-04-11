import { IUseCase } from "../../../../core/domain/contracts/usecase";
import { IUserRepository } from "../../../user/domain/model/user-repository";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { extractTokenFromHeader } from "../../../../core/presentation/helpers/extract-token";
import { ExpiredTokenError } from "../../../../core/domain/errors/expired-token-error";
import { generateToken } from "../../infra/adapters/token-generation";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

dotenv.config();
const SECRET = process.env.TOKEN_SECRET as string;

export interface ILoginWithTokenParams {
    access_token: string;
}

export class LoginWithTokenUseCase implements IUseCase {
    constructor (
        private userRepository: IUserRepository
    ) { }

    async run(data: ILoginWithTokenParams) {
        const current_token = extractTokenFromHeader(data.access_token);
        let userData = jwt.verify(current_token, SECRET);
        const userTryingToLogin = await this.userRepository.retrieveUserByName(userData.displayName);
        if (userTryingToLogin !== undefined) {
            const token = generateToken({ userid: userTryingToLogin!.userid!, displayName: userData.displayName });
            return {
                token,
                user: {
                    userid: userTryingToLogin!.userid,
                    displayName: userTryingToLogin!.displayName,
                    email: userTryingToLogin.email
                }
            };
        } else throw new InvalidCredentialsError();
    }
}
