import express from 'express';
import { AuthRouter } from '../../features/auth/auth-routes';
import { NoteRouter } from '../../features/note/note-routes';
import { UserRouter } from '../../features/user/user-routes';
import { logRequest } from './middlewares';

export const enabledRoutes = (app: express.Application) => {
    app.use('/user', logRequest, UserRouter.getRoutes());
    app.use('/auth', logRequest, AuthRouter.getRoutes());
    app.use('/note', logRequest, NoteRouter.getRoutes());
};
