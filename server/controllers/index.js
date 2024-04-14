
import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware/auth.middleware.js';
import {userRouter} from './userController/user.controller.js';
import { authRouter } from './authController/auth.controller.js';
import { teamRoutes } from '../routes/teamRoutes/teamRoutes.js';
import { roleRoutes } from '../routes/roleRoutes/roleRoutes.js';

const appRouter = express.Router();

appRouter.use('/user', authenticateToken, userRouter);
appRouter.use('/auth', authRouter);
appRouter.use('/team', authenticateToken, teamRoutes);
appRouter.use('/role', authenticateToken, roleRoutes);

export default appRouter;