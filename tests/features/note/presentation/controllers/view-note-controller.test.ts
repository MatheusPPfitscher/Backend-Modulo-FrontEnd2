import { startDatabases, stopDatabases } from "../../../../helpers/handle-databases-for-testing";
import { configureExpressApp } from "../../../../../src/core/presentation/server";
import { clearDatabases } from "../../../../helpers/clean-databases-for-testing";
import request from "supertest";
import { signUpTestUser } from "../../../../helpers/signup-user-for-testing";
import { ICreateNoteParams } from "../../../../../src/features/note/domain/usecases/create-note-usecase";
import { generateTestToken } from "../../../../helpers/token-generation-for-testing";
import { IUser } from "../../../../../src/features/user/domain/model/user";
import { createNoteTester } from "../../../../helpers/create-note-for-testing";


describe("View Note Controller Integration tests", () => {
    let app: Express.Application | undefined;

    beforeAll(async () => {
        await startDatabases();
        app = configureExpressApp();
    });

    afterAll(async () => {
        await clearDatabases();
        await stopDatabases();
        app = undefined;
    });

    beforeEach(async () => {
        await clearDatabases();
    });

    test("If request is missing auth header, should return error.msg: ExpiredTokenError", async () => {
        await request(app)
            .get(`/note`)
            .send({})
            .expect(401)
            .expect((response) => {
                expect(response.body.msg).toEqual("ExpiredTokenError");
            });
    });

    test("If not provided with a note uid, should return msg:NoteView and all notes from user", async () => {
        const testUser = await signUpTestUser();
        const authTokenForUser = generateTestToken(testUser);
        const fakeNotes = [await createNoteTester(testUser), await createNoteTester(testUser)];

        await request(app)
            .get("/note")
            .auth(authTokenForUser, { type: "bearer" })
            .send()
            .expect(200)
            .expect((response) => {
                expect(response.body.msg).toEqual("NoteView");
                expect(response.body.data[1].uid).toEqual(fakeNotes[1]!.uid);
            });;
    });

    test("If provided with a note uid, should return msg:NoteView and the note requested", async () => {
        const testUser = await signUpTestUser();
        const authTokenForUser = generateTestToken(testUser);
        const fakeNotes = [await createNoteTester(testUser), await createNoteTester(testUser)];

        await request(app)
            .get(`/note/${fakeNotes[1]!.uid}`)
            .auth(authTokenForUser, { type: "bearer" })
            .send()
            .expect(200)
            .expect((response) => {
                expect(response.body.msg).toEqual("NoteView");
                expect(response.body.data[0].uid).toEqual(fakeNotes[1]!.uid);
            });;
    });
});