"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
class NoteController {
    constructor(noteRepo, userRepo) {
        this.noteRepo = noteRepo;
        this.userRepo = userRepo;
    }
    async create(req, res) {
        const userId = res.locals.userId;
        const newNote = { title: req.body.title, details: req.body.details };
        const user = await this.userRepo.retrieveUserById(userId);
        if (user !== undefined) {
            const result = await this.noteRepo.addNote(user, newNote);
            if (result) {
                return res.status(201).send({ msg: "NoteCreated", data: newNote });
            }
            else {
                return res.status(500).send({ msg: "ServerError" });
            }
        }
        else {
            return res.status(404).send({ msg: "UserNotFound" });
        }
    }
    async view(req, res) {
        const userId = res.locals.userId;
        const noteUid = req.params.uid;
        const user = await this.userRepo.retrieveUserById(userId);
        if (user) {
            const notesView = await this.noteRepo.viewNote(user, noteUid);
            return res.status(200).send({ msg: "NotesAdquired", data: notesView });
        }
        else {
            return res.status(404).send({ msg: "UserNotFound" });
        }
    }
    async edit(req, res) {
        const noteUid = req.params.uid;
        const editedNote = req.body;
        if (noteUid !== "") {
            const result = await this.noteRepo.editNote(noteUid, editedNote);
            if (result) {
                return res.status(201).send({ msg: "NoteUpdated", data: editedNote });
            }
            else {
                res.status(500).send({ msg: "ServerError" });
            }
        }
        else
            return res.status(404).send({ msg: "EmptyNoteUid" });
    }
    async delete(req, res) {
        const noteUid = req.params.uid;
        if (noteUid !== "") {
            const result = await this.noteRepo.removeNote(noteUid);
            if (result) {
                return res.status(201).send({ msg: "NoteDeleted" });
            }
            else {
                res.status(404).send({ msg: "NoteNotFound" });
            }
        }
        else
            return res.status(404).send({ msg: "EmptyNoteUid" });
    }
}
exports.NoteController = NoteController;
