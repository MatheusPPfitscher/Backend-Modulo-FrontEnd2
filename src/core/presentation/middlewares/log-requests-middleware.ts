import { Request, Response, NextFunction } from "express";

export const logRequest = function (req: Request, res: Response, next: NextFunction) {
    console.log({
        "Method": req.method, "Url": req.baseUrl, "IP": req.ip, "Body:": req.body,
        Params: req.params, Auth: req.headers.authorization
    });
    next();
};



