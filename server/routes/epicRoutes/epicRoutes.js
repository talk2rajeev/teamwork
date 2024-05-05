
import express from 'express';
import * as epicController from '../../controllers/epicController/epic.controller.js';

const epicRoutes = express.Router();


epicRoutes.post('/createEpic', epicController.createEpicController);
epicRoutes.get('/getEpicsByProductId/:id', epicController.getEpicsByProductIdController);
epicRoutes.post('/updateEpic/:id', epicController.updateEpicController);
epicRoutes.get('/getEpicById/:id', epicController.getEpicsByIdController);
epicRoutes.get('/getEpics', epicController.getEpicsController);
// epicRoutes.get('/getAllProductsWithTeam', productController.getAllProductsWithTeamController);
// epicRoutes.get('/getProductById/:id', productController.getProductByIdController);

export { epicRoutes };
