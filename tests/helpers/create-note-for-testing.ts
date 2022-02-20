import faker from "@faker-js/faker";
import { User } from "../../src/core/infra/database/entities/User";
import { UserRepository } from "../../src/core/infra/database/repositories/db-user-repository";
import { INote } from "../../src/features/note/domain/model/note";
import { NoteRepository } from "../../src/features/note/infra/repositories/db-note-repository";
import { IUser } from "../../src/features/user/domain/model/user";


export const createNoteTester = async (userdata: IUser) => {
    const userRepository = new UserRepository();
    const noteRepository = new NoteRepository();

    const user = await userRepository.retrieveUserById(userdata.userid!);
    if (user !== undefined) {
        const noteData = {
            title: faker.company.companyName(),
            details: faker.company.catchPhraseDescriptor()
        };
        console.log(user);
        const noteEntity = await noteRepository.createNote(user as User, noteData);
        return noteEntity;
    }
};