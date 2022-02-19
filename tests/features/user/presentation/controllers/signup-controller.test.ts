import { startDatabases, stopDatabases } from "../../../../helpers/handle-databases-for-testing";
import { configureExpressApp } from "../../../../../src/core/presentation/server";
import { clearDatabases } from "../../../../helpers/clean-databases-for-testing";
import request from "supertest";
import { signUpTestUser } from "../../../../helpers/signup-user-for-testing";
import { ISignUpParams } from "../../../../../src/features/user/domain/usecases/signup-usecase";


describe("Signup Controller Integration tests", () => {
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
        const testRequestBody: ISignUpParams = {
            username: "",
            password: "teste"
        };

        await request(app)
            .post("/user")
            .send(testRequestBody)
            .expect(400)
            .expect((response) => {
                expect(response.body.msg).toEqual("MissingFieldError");
            });
    });

    test("If username provided already exists, should return error.msg: UserAlreadyExistsError", async () => {
        const existingUser = signUpTestUser();

        const signupAttempt: ISignUpParams = {
            username: (await existingUser).username,
            password: "teste"
        };

        await request(app)
            .post("/user")
            .send(signupAttempt)
            .expect(409)
            .expect((response) => {
                expect(response.body.msg).toEqual("UserAlreadyExistsError");
            });
    });
});