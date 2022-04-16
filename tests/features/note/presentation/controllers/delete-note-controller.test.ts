import { startDatabases, stopDatabases } from "../../../../helpers/handle-databases-for-testing";
import { configureExpressApp } from "../../../../../src/core/presentation/server";
import { clearDatabases } from "../../../../helpers/clean-databases-for-testing";
import request from "supertest";
import { signUpTestUser } from "../../../../helpers/signup-user-for-testing";
import { generateTestToken } from "../../../../helpers/token-generation-for-testing";
import { createNoteTester } from "../../../../helpers/create-note-for-testing";

describe("Delete Note Controller Integration tests", () => {
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
            .delete(`/note/${fakeid}`)
            .send({})
            .expect(401)
            .expect((response) => {
                expect(response.body.msg).toEqual("ExpiredTokenError");
            });
    });

    test("Valid request should return data.affected = 1", async () => {
        const testUser = await signUpTestUser();
        const authTokenForUser = generateTestToken(testUser);
        const testNote = await createNoteTester(testUser);


        await request(app)
            .delete(`/note/${testNote!.id}`)
            .auth(authTokenForUser, { type: "bearer" })
            .send()
            .expect(200)
            .expect((response) => {
                expect(response.body.data.affected).toEqual(1);
            });
    });
});