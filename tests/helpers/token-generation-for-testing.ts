import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IPayload } from '../../src/features/auth/domain/model/payload';
import { IUser } from '../../src/features/user/domain/model/user';

dotenv.config();
const SECRET = process.env.TOKEN_SECRET as string;
const TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME as string;

export function generateTestToken(user: IUser): string {
    const token = jwt.sign(
        {
            userid: user.userid,
            displayName: user.displayName
        },
        SECRET,
        { expiresIn: TOKEN_EXPIRATION_TIME });
    return token;
}