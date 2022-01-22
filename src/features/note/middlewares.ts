import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { SECRET } from "../../core/presentation/server";

export function extractTokenFromHeader(authHeader: string): string {
    return authHeader.split(" ")[1];
}

export const validateTokenRequest = function (req: Request, res: Response, next: NextFunction) {
    const authHeader: string = req.headers.authorization as string;
    try {
        const token = extractTokenFromHeader(authHeader);
        let data = jwt.verify(token, SECRET);
        res.locals.userId = data.userId;
        next();
    }
    catch {
        return res.status(400).send({
            msg: "ExpiredToken"
        });
    }
};