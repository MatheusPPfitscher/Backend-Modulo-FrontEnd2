import express from 'express';
import cors from 'cors';
import { enabledRoutes } from './routes';
import dotenv from 'dotenv';

dotenv.config();
export const SECRET = process.env.TOKEN_SECRET as string;

export const initServer = async () => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    enabledRoutes(app);

    await app.listen(process.env.PORT, () => console.log("Server is running..."));
};