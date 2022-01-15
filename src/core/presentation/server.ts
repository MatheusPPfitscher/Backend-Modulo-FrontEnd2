import express from 'express';
import cors from 'cors';
import { enabledRoutes } from './routes';

export const initServer = async () => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    enabledRoutes(app);

    await app.listen(process.env.API_PORT, () => console.log("Server is running..."));
};