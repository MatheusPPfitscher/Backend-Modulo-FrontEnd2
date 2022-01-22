import jwt from 'jsonwebtoken';
import { IPayload } from '../../features/auth/auth-contracts';
import { SECRET } from "../presentation/server";

export function generateToken(payload: IPayload): string {
    const token = jwt.sign(
        {
            userId: payload.userid,
            username: payload.username
        },
        SECRET,
        { expiresIn: 5 * 60 });
    return token;
}