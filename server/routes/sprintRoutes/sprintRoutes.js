import express from 'express';
import * as sprintController from '../../controllers/sprintController/sprint.controller.js';

const sprintRoutes = express.Router();

sprintRoutes.post('/createSprint', sprintController.createSprintController);
sprintRoutes.get('/getAllSprints', sprintController.getAllSprintsController);
sprintRoutes.put('/updateSprint/:id', sprintController.updateSprintController);
sprintRoutes.get('/getSprintById/:id', sprintController.getSprintByIdController);
sprintRoutes.get('/getSprintByProductId/:id', sprintController.getSprintByProductIdController);
export { sprintRoutes };
