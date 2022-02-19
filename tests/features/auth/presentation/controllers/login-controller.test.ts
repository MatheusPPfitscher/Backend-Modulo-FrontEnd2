import { startDatabases, stopDatabases } from "../../../../helpers/handle-databases-for-testing";
import { configureExpressApp } from "../../../../../src/core/presentation/server";
import { clearDatabases } from "../../../../helpers/clean-databases-for-testing";
import { ILoginParams } from "../../../../../src/features/auth/domain/usecases/login-usecase";
import request from "supertest";
import { signUpTestUser } from "../../../../helpers/signup-user-for-testing";
import { validateTokenTester } from "../../../../helpers/token-validation-for-testing";

describe("Login Controller Integration tests", () => {
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

    test("If request is missing or empty username, should return error.msg: MissingFieldError", async () => {
        const testRequestBody: ILoginParams = {
            username: "",
            password: "teste"
        };

        await request(app)
            .post("/auth")
            .send(testRequestBody)
            .expect(400)
            .expect((response) => {
                expect(response.body.msg).toEqual("MissingFieldError");
            });
    });

    test("If username provided on request dont exist, should return error.msg: InvalidCredentialsError", async () => {
        const testRequestBody: ILoginParams = {
            username: "usuarioQueNaoExiste",
            password: "teste"
        };

        await request(app)
            .post("/auth")
            .send(testRequestBody)
            .expect(409)
            .expect((response) => {
                expect(response.body.msg).toEqual("InvalidCredentialsError");
            });
    });

    test("if username provided exists but password is incorrect, should return error.msg: InvalidCredentialsError", async () => {
        let testUser = await signUpTestUser();
        testUser.password = "garbage";

        await request(app)
            .post("/auth")
            .send(testUser)
            .expect(409);
    });

    test("if username and password, should return a valid token", async () => {
        let testUser = await signUpTestUser();

        await request(app)
            .post("/auth")
            .send(testUser)
            .expect(200)
            .expect((response) => {
                expect(validateTokenTester(response.body.data)).toBeTruthy();
            });
    });
});
