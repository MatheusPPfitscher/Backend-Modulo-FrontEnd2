import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { ILogin } from "../../features/auth/auth-contracts";
import { SECRET } from "./contracts";

export function extractTokenFromHeader(fullToken: string): string {
    return fullToken.split(" ")[1];
}

export function generateToken(login: ILogin): string {
    const token = jwt.sign(
        { username: login.username, password: login.password },
        SECRET,
        { expiresIn: 5 * 60 });
    return token;
}

export const logRequest = function (req: Request, res: Response, next: NextFunction) {
    console.log({
        "Method": req.method, "Url": req.url, "IP": req.ip, "Body:": req.body,
        Params: req.params, Auth: req.headers.authorization
    });
    next();
};

export const validateTokenRequest = function (req: Request, res: Response, next: NextFunction) {
    const authHeader: string = req.headers.authorization as string;
    if (authHeader) {
        try {
            const token = extractTokenFromHeader(authHeader);
            const validation = jwt.verify(token, SECRET);
            next();
        }
        catch {
            return res.status(400).send({
                msg: "ExpiredToken",
                data: {}
            });
        }
    } else return res.status(400).send({
        msg: "MissingToken",
        data: {}
    });
};


