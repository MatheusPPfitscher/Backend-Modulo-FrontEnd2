import jwt from 'jsonwebtoken';
import { IPayload } from '../../domain/model/payload';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.TOKEN_SECRET as string;
const TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME as string;

export function generateToken(payload: IPayload): string {
    const token = jwt.sign(
        {
            userid: payload.userid,
            displayName: payload.displayName
        },
        SECRET,
        { expiresIn: TOKEN_EXPIRATION_TIME });
    return token;
}