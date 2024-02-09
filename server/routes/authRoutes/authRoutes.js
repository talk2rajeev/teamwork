import express from 'express';
import * as authControllers from '../../controllers/authController/auth.controller.js';

const authRouts = express.Router();

authRouts.post('/login', authControllers.login);
authRouts.post('/token', authControllers.token)

export { authRouts };



