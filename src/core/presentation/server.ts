import express from 'express';
import cors from 'cors';
import { makeRoutes } from './routes';
import dotenv from 'dotenv';

dotenv.config();
export const SECRET = process.env.TOKEN_SECRET as string;
export const TOKEN_EXPIRATION_TIME: number = 7 * 60;

export const createServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    makeRoutes(app);

    return app;
};

export const initServer = async (app?: any) => {
    app = app ?? createServer();

    await app.listen(process.env.PORT, () => console.log("Server is running..."));
};