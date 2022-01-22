"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRequest = void 0;
const logRequest = function (req, res, next) {
    console.log({
        "Method": req.method, "Url": req.baseUrl, "IP": req.ip, "Body:": req.body,
        Params: req.params, Auth: req.headers.authorization
    });
    next();
};
exports.logRequest = logRequest;
