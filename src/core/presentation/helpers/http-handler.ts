import { Response } from "express";
import { DomainError } from "../../domain/errors/domain-error";
import { ControllerError } from "../errors/controller-error";

export const successResponse = (res: Response, msg: string, data?: any) => {
    return res.status(200).send({
        msg,
        data,
    });
};

export const failureResponse = (res: Response, error: any) => {
    if (error instanceof DomainError || error instanceof ControllerError) {
        return res.status(error.code).send({
            msg: error.message
        });
    }

    if (error instanceof Error) {
        return res.status(500).send({
            msg: error.message
        });
    }

    return res.status(500).send({
        msg: error.message
    });
};
