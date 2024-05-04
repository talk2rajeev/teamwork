
import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware/auth.middleware.js';
import {userRoutes} from '../routes/userRoutes/userRoutes.js';
import { teamRoutes} from '../routes/teamRoutes/teamRoutes.js';
import { authRouts } from '../routes/authRoutes/authRoutes.js';
import { roleRoutes } from '../routes/roleRoutes/roleRoutes.js';
import { productRoutes } from '../routes/productRoutes/productRoutes.js';
import { epicRoutes } from '../routes/epicRoutes/epicRoutes.js';

const appRouts = express.Router();

appRouts.use('/user', authenticateToken, userRoutes);
appRouts.use('/auth', authRouts);
appRouts.use('/team', authenticateToken, teamRoutes);
appRouts.use('/role', authenticateToken, roleRoutes);
appRouts.use('/product', authenticateToken, productRoutes);
appRouts.use('/epic', authenticateToken, epicRoutes);

export default appRouts;