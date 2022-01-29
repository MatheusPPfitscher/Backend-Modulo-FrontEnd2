import express from 'express';
import { AuthRouter } from '../../features/auth/presentation/routes/auth-routes';
import { NoteRouter } from '../../features/note/presentation/routes/note-routes';
import { UserRouter } from '../../features/user/presentation/routes/user-routes';
import { logRequest } from './middlewares/log-requests-middleware';

export const makeRoutes = (app: express.Application) => {
    app.use('/user', logRequest, UserRouter.getRoutes());
    app.use('/auth', logRequest, AuthRouter.getRoutes());
    app.use('/note', logRequest, NoteRouter.getRoutes());
};
