import {userService} from '../../services/userService/user.service.js';


async function createUserLoginController(req,res) {
    const user = req.body;
    try {
        // const userId = await userProfileService.saveUserProfile(fname, lname, role);
        const data = await userService.createUserLogin(user);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateUserProfileController(req,res) {
    const userId = req.params.id;
    const userData = req.body;
    try {
        const success = await userService.updateUserProfile(userData, userId);
        if (success) {
            res.status(200).json({ message: 'User profile updated successfully' });
        } else {
            res.status(404).json({ error: 'User profile not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUsersController(req,res) {
    const users = await userService.getUsers();
    res.send(users);
};

async function getUserByIdController(req,res) {
    const id = req.params.id;
    const users = await userService.getUserById(id);
    res.send(users);
};

export { createUserLoginController,
    updateUserProfileController,
    getUsersController,
    getUserByIdController };



