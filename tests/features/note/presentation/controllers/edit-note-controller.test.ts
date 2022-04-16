import { startDatabases, stopDatabases } from "../../../../helpers/handle-databases-for-testing";
import { configureExpressApp } from "../../../../../src/core/presentation/server";
import { clearDatabases } from "../../../../helpers/clean-databases-for-testing";
import request from "supertest";
import { signUpTestUser } from "../../../../helpers/signup-user-for-testing";
import { generateTestToken } from "../../../../helpers/token-generation-for-testing";
import { IEditNoteParams } from "../../../../../src/features/note/domain/usecases/edit-note-usecase";
import { createNoteTester } from "../../../../helpers/create-note-for-testing";

describe("Edit Note Controller Integration tests", () => {
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
        const fakeid = "id-QUE-NAO-EXISTE";
        await request(app)
            .put(`/note/${fakeid}`)
            .send({})
            .expect(401)
            .expect((response) => {
                expect(response.body.msg).toEqual("ExpiredTokenError");
            });
    });

    test("If request is missing note title, should return error.msg: MissingFieldError", async () => {
        const testUser = await signUpTestUser();
        const authTokenForUser = generateTestToken(testUser);

        const testNote = await createNoteTester(testUser);

        const testRequestBody: Partial<IEditNoteParams> = {
            details: "detalhes..."
        };

        await request(app)
            .put(`/note/${testNote!.id}`)
            .auth(authTokenForUser, { type: "bearer" })
            .send(testRequestBody)
            .expect(400)
            .expect((response) => {
                expect(response.body.msg).toEqual("MissingFieldError");
            });
    });

    test("If request id do not exist on database, should return error.msg: NoteNotFound", async () => {
        const testUser = await signUpTestUser();
        const authTokenForUser = generateTestToken(testUser);

        const testRequestBody: IEditNoteParams = {
            id: "Non-Existe-id",
            title: "Aquela note",
            details: "que não existe"
        };

        await request(app)
            .put(`/note/${testRequestBody!.id}`)
            .auth(authTokenForUser, { type: "bearer" })
            .send(testRequestBody)
            .expect(404)
            .expect((response) => {
                expect(response.body.msg).toEqual("NoteNotFoundError");
            });
    });

    test("If request is valid, should return msg:NoteEdited", async () => {
        const testUser = await signUpTestUser();
        const authTokenForUser = generateTestToken(testUser);
        const testNote = await createNoteTester(testUser);

        const testRequestBody: Partial<IEditNoteParams> = {
            title: "Aqui temos",
            details: "mais detalhes..."
        };

        await request(app)
            .put(`/note/${testNote!.id}`)
            .auth(authTokenForUser, { type: "bearer" })
            .send(testRequestBody)
            .expect(200)
            .expect((response) => {
                expect(response.body.msg).toEqual("NoteEdited");
            });
    });
});