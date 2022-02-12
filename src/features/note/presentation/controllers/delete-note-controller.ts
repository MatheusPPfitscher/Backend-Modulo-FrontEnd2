import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MissingFieldError } from "../../../../core/presentation/errors/missing-field-error";
import { failureResponse, successResponse } from "../../../../core/presentation/helpers/http-handler";
import { IDeleteNoteParams, DeleteNoteUseCase } from "../../domain/usecases/delete-note-usecase";

export class DeleteNoteController implements Controller {
    constructor (private deleteNoteUseCase: DeleteNoteUseCase) { }

    async execute(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<any> {
        try {
            const useCaseData: IDeleteNoteParams = {
                uid: req.params.uid
            };

            if (!useCaseData.uid) {
                throw new MissingFieldError("uid");
            }

            const result = await this.deleteNoteUseCase.run(useCaseData);
            successResponse(res, "NoteDeleted", result);
        }
        catch (error) {
            failureResponse(res, error);
        }
    }
}