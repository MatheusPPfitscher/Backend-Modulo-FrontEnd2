"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteRepository = void 0;
const connection_1 = require("../connections/connection");
const Note_1 = require("../entities/Note");
class NoteRepository {
    constructor() {
        this.repository = connection_1.DatabaseConnection.getConnection().manager.getRepository(Note_1.Note);
    }
    async addNote(user, noteData) {
        const noteEntity = this.repository.create(noteData);
        noteEntity.user = user;
        try {
            await this.repository.save(noteEntity);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    async viewNote(user, noteUid) {
        console.log(user);
        let notes = [];
        if (noteUid) {
            for (let note of user.notes) {
                if (note.uid === noteUid)
                    notes.push(note);
            }
        }
        else {
            notes = user.notes;
            notes.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
        }
        return notes;
    }
    async editNote(noteUid, noteData) {
        try {
            console.log(noteUid);
            console.log(noteData);
            let result = await this.repository.update({ uid: noteUid }, noteData);
            console.log(result);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    async removeNote(noteUid) {
        try {
            const result = await this.repository.delete(noteUid);
            if (result.affected)
                return true;
            return false;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
exports.NoteRepository = NoteRepository;
