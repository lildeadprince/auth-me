import { Router } from 'express';
import { userRoute } from './user/index.js';

export const appRouter = new Router();

appRouter.use('/user', userRoute);
