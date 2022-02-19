import { Response } from "express";
import { DomainError } from "../../domain/errors/domain-error";
import { IResponseBody } from "../contracts/response-body";
import { ControllerError } from "../errors/controller-error";

export const successResponse = (res: Response, msg: string, data?: any) => {
    const responseBody: IResponseBody = {
        msg,
        data
    };
    return res.status(200).send(responseBody);
};

export const failureResponse = (res: Response, error: any) => {
    if (error instanceof DomainError || error instanceof ControllerError) {
        const responseBody: IResponseBody = {
            msg: error.name,
            data: error.message
        };
        return res.status(error.code).send(responseBody);
    }

    if (error instanceof Error) {
        const responseBody: IResponseBody = {
            msg: error.name,
            data: error.message
        };
        return res.status(500).send(responseBody);
    }
};
