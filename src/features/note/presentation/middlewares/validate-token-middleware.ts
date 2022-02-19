import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { failureResponse } from "../../../../core/presentation/helpers/http-handler";
import { ExpiredTokenError } from "../../domain/errors/expired-token-error";

dotenv.config();
const SECRET = process.env.TOKEN_SECRET as string;

export function extractTokenFromHeader(authHeader: string): string {
    return authHeader.split(" ")[1];
}

export const validateToken = function (req: Request, res: Response, next: NextFunction) {
    const authHeader: string = req.headers.authorization as string;
    try {
        const token = extractTokenFromHeader(authHeader);
        let data = jwt.verify(token, SECRET);
        res.locals.userid = data.userid;
        next();
    }
    catch {
        return failureResponse(res, new ExpiredTokenError());
    }
};