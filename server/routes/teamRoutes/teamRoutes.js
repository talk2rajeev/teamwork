import express from 'express';
import * as teamController from '../../controllers/teamController/team.controller.js';

const teamRoutes = express.Router();


teamRoutes.post('/createTeam', teamController.createTeamController);
teamRoutes.post('/updateTeam/:id', teamController.updateTeamController);
teamRoutes.get('/getAllTeams', teamController.getTeamsController);
teamRoutes.get('/getTeamById/:id', teamController.getTeamByIdController);
teamRoutes.post('/assignRoleToTeam', teamController.assignRoleToTeamController);
teamRoutes.post('/updateUserRoleInTeam', teamController.updateUserRoleInTeamController);
teamRoutes.get('/getAllTeamsWithUsers', teamController.getAllTeamsWithUsersController);

export { teamRoutes };



