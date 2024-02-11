
import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware/auth.middleware.js';
import {userRoutes} from '../routes/userRoutes/userRoutes.js';
import { teamRoutes} from '../routes/teamRoutes/teamRoutes.js';
import { authRouts } from '../routes/authRoutes/authRoutes.js';

const appRouts = express.Router();

appRouts.use('/user', authenticateToken, userRoutes);
appRouts.use('/auth', authRouts);
appRouts.use('/team', authenticateToken, teamRoutes)

export default appRouts;