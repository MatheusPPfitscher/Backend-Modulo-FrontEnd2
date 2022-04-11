import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { failureResponse } from "../../../../core/presentation/helpers/http-handler";
import { ExpiredTokenError } from "../../../../core/domain/errors/expired-token-error";
import { extractTokenFromHeader } from "../../../../core/presentation/helpers/extract-token";

dotenv.config();
const SECRET = process.env.TOKEN_SECRET as string;

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