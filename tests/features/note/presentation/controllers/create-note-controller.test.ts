import { startDatabases, stopDatabases } from "../../../../helpers/handle-databases-for-testing";
import { configureExpressApp } from "../../../../../src/core/presentation/server";
import { clearDatabases } from "../../../../helpers/clean-databases-for-testing";
import request from "supertest";
import { signUpTestUser } from "../../../../helpers/signup-user-for-testing";
import { ICreateNoteParams } from "../../../../../src/features/note/domain/usecases/create-note-usecase";
import { generateTokenFromUser } from "../../../../helpers/token-generation-for-testing";
import { IUser } from "../../../../../src/features/user/domain/model/user";


describe("Create Note Controller Integration tests", () => {
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
            .post("/note")
            .send({})
            .expect(401)
            .expect((response) => {
                expect(response.body.msg).toEqual("ExpiredTokenError");
            });
    });


    test("if request is missing userid, should return error.msg: MissingFieldError", async () => {
        const testUser = await signUpTestUser();
        const authTokenForUser = generateTokenFromUser(testUser);

        const testRequestBody: Partial<ICreateNoteParams> = {
            title: "titulo",
            details: "detalhes..."
        };

        await request(app)
            .post("/note")
            .auth(authTokenForUser, { type: "bearer" })
            .send(testRequestBody)
            .expect(400)
            .expect((response) => {
                expect(response.body.msg).toEqual("MissingFieldError");
            });
    });

    test.only("if request is missing title, should return error.msg: MissingFieldError", async () => {
        const testUser: IUser = await signUpTestUser();
        const authTokenForUser = generateTokenFromUser(testUser);

        const testRequestBody: Partial<ICreateNoteParams> = {
            userid: testUser.userid,
            details: "São meros detalhes...",
        };

        await request(app)
            .post("/note")
            .auth(authTokenForUser, { type: "bearer" })
            .send(testRequestBody)
            .expect(400)
            .expect((response) => {
                expect(response.body.msg).toEqual("MissingFieldError");
            });
    });

    test.only("Valid request should return a note object", async () => {
        const testUser: IUser = await signUpTestUser();
        const authTokenForUser = generateTokenFromUser(testUser);

        const testRequestBody: Partial<ICreateNoteParams> = {
            userid: testUser.userid,
            title: "Agora vai",
            details: "escrever em homologação",
        };

        await request(app)
            .post("/note")
            .auth(authTokenForUser, { type: "bearer" })
            .send(testRequestBody)
            .expect(200)
            .expect((response) => {
                expect(response.body.msg).toEqual("NoteCreated");
            });
    });

});