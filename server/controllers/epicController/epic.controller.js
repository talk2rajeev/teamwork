import * as epicService from '../../services/epicService/epic.service.js';

async function createEpicController(req,res) {
    const {epicName, epicDescription, createdById, productId} = req.body;
    try {
        const data = await epicService.createEpic({epicName, epicDescription, createdById, productId})
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateEpicController(req,res) {
    const epicId = req.params.id;
    try {
        const data = await epicService.updateEpic({...req.body}, epicId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getEpicsController(req,res) {
    try {
        const data = await epicService.getEpics();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getEpicsByIdController(req,res) {
    const epicId = req.params.id;
    try {
        const data = await epicService.getEpicById(epicId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getEpicsByProductIdController(req,res) {
    const productId = req.params.id;
    try {
        const data = await epicService.getEpicsByProductId(productId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




export { 
    createEpicController,
    getEpicsController,
    updateEpicController,
    getEpicsByIdController,
    getEpicsByProductIdController,
};



