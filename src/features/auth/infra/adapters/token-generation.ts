import jwt from 'jsonwebtoken';
import { SECRET, TOKEN_EXPIRATION_TIME } from "../../../../core/presentation/server";
import { IPayload } from '../../domain/model/payload';

export function generateToken(payload: IPayload): string {
    const token = jwt.sign(
        {
            userId: payload.userid,
            username: payload.username
        },
        SECRET,
        { expiresIn: TOKEN_EXPIRATION_TIME });
    return token;
}