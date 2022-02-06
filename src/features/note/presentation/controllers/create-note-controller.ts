import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
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

            const result = await this.addNoteUseCase.run(useCaseData);
            successResponse(res, "NoteCreated", result);
        }
        catch (error) {
            failureResponse(res, error);
        }
    }
}