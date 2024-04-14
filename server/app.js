import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
// import {userRouter} from './controllers/userController/user.controller.js';
// import { authRouter } from './controllers/authController/auth.controller.js';
// import { authenticateToken } from './middlewares/authMiddleware/auth.middleware.js';
import appRouts from './routes/appRoutes.js'

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api', appRouts);


// app.use('/api/user', authenticateToken, userRouter);
// app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    console.log('Something went wrong ', err);
    res.status(err.status || 500).send('Something went wrong');

});

// Define a function to start the server
function startServer(port) {
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  
    // Return the server instance for testing purposes
    return server;
  }

export {startServer, app};