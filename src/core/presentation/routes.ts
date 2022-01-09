import express from 'express';
import { UserRouter } from '../../features/user/user-routes';
import { SessionRouter } from '../../features/session/session-routes';

export const enabledRoutes = (app: express.Application) => {
    app.use('/user', UserRouter.getRoutes());
    app.use('/session', SessionRouter.getRoutes());
};
