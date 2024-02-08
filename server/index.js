import express from 'express';
import 'express-async-errors';
import router from './controllers/userController/user.controller.js';
const app = express();

app.use(express.json());


app.use('/api/user', router);

app.use((err, req, res, next) => {
    console.log('Something went wrong ', err);
    res.status(err.status || 500).send('Something went wrong');

});

app.listen(3000, ()=>{
    console.log('Server Listening on PORT 3000...');
});