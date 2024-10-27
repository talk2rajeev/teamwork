import * as teamService from "../../services/teamService/team.service.js";
import { getFormattedTeamsWithUsers } from "../../utils/formatter.js";
import CustomResponse from "../../utils/customResponse.js";
import { getErrorResponse } from "../../utils/errorResponse.js";

async function createTeamController(req, res) {
  const { teamName, createdById } = req.body;
  const response = new CustomResponse(true, "Team created Successfully.", 201);
  try {
    // const userId = await userProfileService.saveUserProfile(fname, lname, role);
    const data = await teamService.createTeam(teamName, createdById);

    if (data.affectedRows === 0) {
      response.success = false;
      response.message = "Failed to create Team.";
      response.status = 500;
    }

    res.status(response.status).json(response);
  } catch (error) {
    const errResponse = getErrorResponse(error, response);
    res.status(errResponse.status).json(errResponse);
  }
}

async function updateTeamController(req, res) {
  const { teamName } = req.body;
  const teamId = req.params.id;
  const response = new CustomResponse(true, "Team updated Successfully.", 200);
  try {
    const success = await teamService.updateTeam(teamName, teamId);

    if (!success) {
      response.success = false;
      response.message = "Failed to update Team.";
      response.status = 500;
    }
    res.status(response.status).json(response);
  } catch (error) {
    const errResponse = getErrorResponse(error, response);
    res.status(errResponse.status).json(errResponse);
  }
}

async function getTeamsController(req, res) {
  const response = new CustomResponse(true, "", 200, []);
  try {
    const teams = await teamService.getTeams();
    response.data = teams;
    if (!teams) {
      response.success = false;
      response.message = "Failed to get Teams.";
      response.status = 500;
    }
    res.status(response.status).json(response);
  } catch (error) {
    const errResponse = getErrorResponse(error, response);
    res.status(errResponse.status).json(errResponse);
  }
}

async function getTeamByIdController(req, res) {
  const id = req.params.id;
  const response = new CustomResponse(true, "", 200);
  try {
    const team = await teamService.getTeamById(id);
    response.data = team;
    if (!team) {
      response.success = false;
      response.message = `Failed to get Team by id ${id}`;
      response.status = 404;
    }

    res.status(response.status).json(response);
  } catch (error) {
    const errResponse = getErrorResponse(error, response);
    res.status(errResponse.status).json(errResponse);
  }
}

async function getTeamWithUsersByIdController(req, res) {
  const id = req.params.id;
  const response = new CustomResponse(true, "", 200);

  try {
    const teamWithUsers = await teamService.getTeamWithUsersById(id);

    if (!teamWithUsers) {
      response.success = false;
      response.message = `Failed to get Team by id ${id}`;
    } else {
      const formattedTeamsWithUsers = getFormattedTeamsWithUsers(teamWithUsers);
      response.data = formattedTeamsWithUsers;
    }
    res.status(response.status).json(response);
  } catch (error) {
    const errResponse = getErrorResponse(error, response);
    res.status(errResponse.status).json(errResponse);
  }
}

async function assignUserRoleInTeamController(req, res) {
  const { teamId, profileId, roleId } = req.body;
  const response = new CustomResponse(true, "User assigned successfully.", 200);
  try {
    const data = await teamService.assignUserRoleInTeam(
      teamId,
      profileId,
      roleId
    );

    if (data.affectedRows === 0) {
      response.success = false;
      response.status = 400;
      response.message = `Failed to assign user into the team`;
    }
    res.status(response.status).json(response);
  } catch (error) {
    const errResponse = getErrorResponse(error, response);
    res.status(errResponse.status).json(errResponse);
  }
}

async function updateUserRoleInTeamController(req, res) {
  const { roleId, userTeamRoleId } = req.body;
  const response = new CustomResponse(true, "", 200);
  try {
    const data = await teamService.updateUserRoleInTeam(roleId, userTeamRoleId);

    if (data.affectedRows === 0) {
      response.success = false;
      response.status = 400;
      response.message = `Failed to update user role into the team`;
    }
    res.status(response.status).json(response);
  } catch (error) {
    const errResponse = getErrorResponse(error, response);
    res.status(errResponse.status).json(errResponse);
  }
}

async function getAllTeamsWithUsersController(req, res) {
  const response = new CustomResponse(true, "", 200);
  try {
    const teamWithUsers = await teamService.getAllTeamsWithUsers();

    if (!teamWithUsers) {
      response.success = false;
      response.message = `Failed to get Team by id ${id}`;
    } else {
      const formattedTeamsWithUsers = getFormattedTeamsWithUsers(teamWithUsers);
      response.data = formattedTeamsWithUsers;
    }
    res.status(response.status).json(response);
  } catch (error) {
    const errResponse = getErrorResponse(error, response);
    res.status(errResponse.status).json(errResponse);
  }
}

async function deleteUserFromTeamController(req, res) {
  const { teamId, profileId } = req.body;
  const response = new CustomResponse(
    true,
    "User deleted from team successfully.",
    200
  );
  try {
    const result = await teamService.deleteUserFromTeam(teamId, profileId);

    if (result.affectedRows === 0) {
      response.success = false;
      response.status = 404;
      response.message = `Failed to delete user from team`;
    }
    res.status(response.status).json(response);
  } catch (error) {
    const errResponse = getErrorResponse(error, response);
    res.status(errResponse.status).json(errResponse);
  }
}

export {
  createTeamController,
  updateTeamController,
  getTeamsController,
  getTeamByIdController,
  getTeamWithUsersByIdController,
  assignUserRoleInTeamController,
  updateUserRoleInTeamController,
  getAllTeamsWithUsersController,
  deleteUserFromTeamController,
};
