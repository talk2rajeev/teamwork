import express from 'express';
import * as userControllers from '../../controllers/userController/user.controller.js';

const userRoutes = express.Router();


userRoutes.post('/createLogin', userControllers.createUserLoginController);
userRoutes.post('/updateProfile/:id', userControllers.updateUserProfileController);
userRoutes.get('/getAllUsers', userControllers.getUsersController);
userRoutes.get('/getUserById/:id', userControllers.getUserByIdController);

export { userRoutes };



