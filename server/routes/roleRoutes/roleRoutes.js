import express from 'express';
import * as roleController from '../../controllers/roleController/role.controller.js';

const roleRoutes = express.Router();


roleRoutes.post('/createRole', roleController.createRoleController);
roleRoutes.post('/updateRole/:id', roleController.updateRoleController);
roleRoutes.get('/getAllRoles', roleController.getRolesController);
roleRoutes.get('/getRoleById/:id', roleController.getRoleByIdController);

export { roleRoutes };
