import * as userStoryService from '../../services/userStoryService/userStory.service.js';

async function createUserStoryController(req,res) {
    const payload = req.body;
    try {
        const data = await userStoryService.createUserStory(payload);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createBugController(req,res) {
    const payload = req.body;
    try {
        const data = await userStoryService.createBug(payload);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateUserStoryController(req,res) {
    const userStoryId = req.params.id;
    const payload = req.body;
    try {
        // const userId = await userProfileService.saveUserProfile(fname, lname, role);
        const data = await userStoryService.updateUserStory(payload, userStoryId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUserStoriesBySprintIdController(req,res) {
    const sprintId = req.params.id;
    try {
        // const userId = await userProfileService.saveUserProfile(fname, lname, role);
        const data = await userStoryService.getUserStoriesBySprintId(sprintId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUserStoriesByProductIdController(req,res) {
    const productId = req.params.id;
    console.log('getting getUserStoriesByProductId ', productId);
    try {
        // const userId = await userProfileService.saveUserProfile(fname, lname, role);
        const data = await userStoryService.getUserStoriesByProductId(productId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}

async function getUserStoriesByEpicIdController(req,res) {
    const epicId = req.params.id;
    console.log('req.query ', req.query);
    try {
        // const userId = await userProfileService.saveUserProfile(fname, lname, role);
        const data = await userStoryService.getUserStoriesByEpicId(epicId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getDetailedUserStoriesBySprintIdController(req,res) {
    const sprintId = req.params.id;
    try {
        const data = await userStoryService.getDetailedUserStoriesBySprintId(sprintId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getDetailedUserStoriesByProductId(req,res) {
    const productId = req.params.id;
    try {
        const data = await userStoryService.getDetailedUserStoriesByProductId(productId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getDetailedUserStoriesByEpicId(req,res) {
    const epicId = req.params.id;
    try {
        const data = await userStoryService.getDetailedUserStoriesByEpicId(epicId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    createUserStoryController,
    createBugController,
    updateUserStoryController,
    getUserStoriesBySprintIdController,
    getUserStoriesByProductIdController,
    getUserStoriesByEpicIdController,
    getDetailedUserStoriesBySprintIdController,
    getDetailedUserStoriesByProductId,
    getDetailedUserStoriesByEpicId
}