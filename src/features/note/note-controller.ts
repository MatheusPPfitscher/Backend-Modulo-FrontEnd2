import { Request, Response } from "express";
import { IUserRepository } from "../user/user-contracts";
import { INote, INoteRepository } from "./note-contracts";


export class NoteController {
    constructor (private noteRepo: INoteRepository, private userRepo: IUserRepository) { }

    async create(req: Request, res: Response) {
        const userId: number = res.locals.userId;
        const newNote: INote = { title: req.body.title, details: req.body.details };
        const user = await this.userRepo.retrieveUserById(userId);
        if (user !== undefined) {
            const result: Boolean = await this.noteRepo.addNote(user, newNote);
            if (result) {
                return res.status(201).send({ msg: "NoteCreated", data: newNote });
            } else {
                return res.status(500).send({ msg: "ServerError" });
            }
        } else {
            return res.status(404).send({ msg: "UserNotFound" });
        }
    }

    async view(req: Request, res: Response) {
        const userId: number = res.locals.userId;
        const noteUid: string = req.params.uid as string;
        const user = await this.userRepo.retrieveUserById(userId);
        if (user) {
            const notesView = await this.noteRepo.viewNote(user, noteUid);
            return res.status(200).send({ msg: "NotesAdquired", data: notesView });
        } else {
            return res.status(404).send({ msg: "UserNotFound" });
        }

    }

    async edit(req: Request, res: Response) {
        const noteUid: string = req.params.uid as string;
        const editedNote = req.body as INote;
        if (noteUid !== "") {
            const result: Boolean = await this.noteRepo.editNote(noteUid, editedNote);
            if (result) {
                return res.status(201).send({ msg: "NoteUpdated", data: editedNote });
            } else {
                res.status(500).send({ msg: "ServerError" });
            }
        } else return res.status(404).send({ msg: "EmptyNoteUid" });

    }

    async delete(req: Request, res: Response) {
        const noteUid: string = req.params.uid as string;
        if (noteUid !== "") {
            const result: Boolean = await this.noteRepo.removeNote(noteUid);
            if (result) {
                return res.status(201).send({ msg: "NoteDeleted" });
            } else {
                res.status(404).send({ msg: "NoteNotFound" });
            }
        } else return res.status(404).send({ msg: "EmptyNoteUid" });

    }

}