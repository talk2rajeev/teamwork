import * as userService from '../../services/userService/user.service.js';


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
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function getUserByIdController(req,res) {
    const id = req.params.id;
    try {
        const user = await userService.getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            // If user is not found, return 404
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { 
    createUserLoginController,
    updateUserProfileController,
    getUsersController,
    getUserByIdController 
};



