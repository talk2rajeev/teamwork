import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import appRouts from './routes/appRoutes.js'



// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', appRouts);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


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