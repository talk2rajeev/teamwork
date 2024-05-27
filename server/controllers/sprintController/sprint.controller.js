import * as sprintService from '../../services/sprintService/sprint.service.js';


async function createSprintController(req,res) {
    const {sprintName, createdById, productId, startDate, endDate} = req.body;
    try {
        // const userId = await userProfileService.saveUserProfile(fname, lname, role);
        const data = await sprintService.createSprint({sprintName, createdById, productId, startDate, endDate});
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllSprintsController(req,res) {
    try {
        // const userId = await userProfileService.saveUserProfile(fname, lname, role);
        const data = await sprintService.getAllSprints();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateSprintController(req, res) {
    // const {sprintName, productId, startDate, endDate} = req.body;
    const sprintId = req.params.id;
    const payload = req.body;
    try {
        // const userId = await userProfileService.saveUserProfile(fname, lname, role);
        const data = await sprintService.updateSprint(payload, sprintId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getSprintByIdController(req, res) {
    const sprintId = req.params.id;
    try {
        // const userId = await userProfileService.saveUserProfile(fname, lname, role);
        const data = await sprintService.getSprintById(sprintId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getSprintByProductIdController(req, res) {
    const productId = req.params.id;
    try {
        // const userId = await userProfileService.saveUserProfile(fname, lname, role);
        const data = await sprintService.getSprintByProductId(productId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export { 
    createSprintController,
    getAllSprintsController,
    updateSprintController,
    getSprintByIdController,
    getSprintByProductIdController,
};



