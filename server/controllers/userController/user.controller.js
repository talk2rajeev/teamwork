import express from 'express';
import * as userService from '../../services/userService/user.service.js';

const router = express.Router();


router.post('/', async (req,res) => {
    const user = req.body;
    
    const resp = await userService.createNewUser(user);
    res.send(resp);
});

router.get('/', async (req,res) => {
    const users = await userService.getUsers();
    res.send(users);
});

router.get('/:id', async (req,res) => {
    const id = req.params.id;
    const users = await userService.getUserById(id);
    res.send(users);
});

export default router;



