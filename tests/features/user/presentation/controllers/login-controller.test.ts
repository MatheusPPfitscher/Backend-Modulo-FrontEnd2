import { startDatabases, stopDatabases } from "../../../../helpers/handle-databases-for-testing";
import { configureExpressApp } from "../../../../../src/core/presentation/server";
import { clearDatabases } from "../../../../helpers/clean-databases-for-testing";
import { ILoginParams } from "../../../../../src/features/auth/domain/usecases/login-usecase";
import request from "supertest";

describe("Login Controller Integration tests", () => {
    let app: Express.Application | undefined = undefined;

    beforeAll(async () => {
        startDatabases();
        app = configureExpressApp();
    });

    afterAll(async () => {
        clearDatabases();
        stopDatabases();
    });

    beforeEach(async () => {
        clearDatabases();
    });

    test("If request is missing or empty username, should return error with msg", async () => {
        const testRequestBody: ILoginParams = {
            username: "",
            password: "teste"
        };

        await request(app)
            .post("/auth")
            .send(testRequestBody)
            .expect(400);
    });
});
