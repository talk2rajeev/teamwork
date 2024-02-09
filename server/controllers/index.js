
import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware/auth.middleware.js';
import {userRouter} from './userController/user.controller.js';
import { authRouter } from './authController/auth.controller.js';

const appRouter = express.Router();

appRouter.use('/user', authenticateToken, userRouter);
appRouter.use('/auth', authRouter);

export default appRouter;