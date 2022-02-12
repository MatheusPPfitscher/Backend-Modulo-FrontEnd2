import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MissingFieldError } from "../../../../core/presentation/errors/missing-field-error";
import { failureResponse, successResponse } from "../../../../core/presentation/helpers/http-handler";
import { INote } from "../../domain/model/note";
import { CreateNoteUseCase, ICreateNoteParams } from "../../domain/usecases/create-note-usecase";

export class CreateNoteController implements Controller {
    constructor (private addNoteUseCase: CreateNoteUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            const useCaseData: ICreateNoteParams = {
                userId: res.locals.userId as number,
                title: req.body.title,
                details: req.body.details
            };

            if (!useCaseData.userId) {
                throw new MissingFieldError("userId");
            }

            if (!useCaseData.title) {
                throw new MissingFieldError("title");
            }

            const result = await this.addNoteUseCase.run(useCaseData);
            successResponse(res, "NoteCreated", result);
        }
        catch (error) {
            failureResponse(res, error);
        }
    }
}