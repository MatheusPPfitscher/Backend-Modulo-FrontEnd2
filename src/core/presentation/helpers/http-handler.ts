import { Response } from "express";
import { DomainError } from "../../domain/errors/domain-error";
import { IResponseBody } from "../contracts/response-body";
import { ControllerError } from "../errors/controller-error";

export const successResponse = (res: Response,  data?: any) => {
    const responseBody: IResponseBody = {
        success: true,
        ...data
    };
    return res.status(200).send(responseBody);
};

export const failureResponse = (res: Response, data: any) => {
    if (data instanceof DomainError || data instanceof ControllerError) {
        const responseBody: IResponseBody = {
            success: "false",
            ...data
        };
        return res.status(data.code).send(responseBody);
    }

    if (data instanceof Error) {
        const responseBody: IResponseBody = {
            success: "false",
            ...data
        };
        return res.status(500).send(responseBody);
    }
};
