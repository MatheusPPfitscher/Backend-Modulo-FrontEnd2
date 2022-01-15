import express from 'express';
import { UserRouter } from '../../features/user/user-routes';
import { logRequest } from './helpers';

export const enabledRoutes = (app: express.Application) => {
    app.use('/user', logRequest, UserRouter.getRoutes());
};
