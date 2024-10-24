import { pool } from "../../config/dbConfig/database.js";
import { SQL_QUERIES } from "../../utils/queries.js";

async function createTeam(teamName, createdById) {
  try {
    const [result, ...meta] = await pool.query(SQL_QUERIES.team.insertQuery, [
      teamName,
      createdById,
    ]);
    return result;
  } catch (err) {
    throw new Error(`Failed to create team: ${err.message}`);
  }
}

async function getTeams() {
  try {
    const [data, ...meta] = await pool.query(SQL_QUERIES.team.getTeamsQuery);
    return data;
  } catch (err) {
    throw new Error(`Failed to get teams: ${err.message}`);
  }
}

async function getTeamById(id) {
  try {
    const [data, ...meta] = await pool.query(
      SQL_QUERIES.team.getTeamByIdQuery,
      [id]
    );
    return data;
  } catch (err) {
    throw new Error(`Failed to get Team by id: ${err.message}`);
  }
}

async function getTeamWithUsersById(id) {
  try {
    const [data, ...meta] = await pool.query(
      SQL_QUERIES.team.getTeamWithUsersByIdQuery,
      [id]
    );
    return data;
  } catch (err) {
    throw new Error(`Failed to get Team by id: ${err.message}`);
  }
}

async function updateTeam(teamName, teamId) {
  if (teamName && teamId) {
    try {
      const result = await pool.query(SQL_QUERIES.team.updateTeamQuery, [
        teamName,
        teamId,
      ]);
      return result;
    } catch (err) {
      throw new Error(`Failed to update team: ${err.message}`);
    }
  } else {
    throw new Error(`Failed to update team: teamName & teamId is mandatory`);
  }
}

async function assignUserRoleInTeam(teamId, profileId, roleId) {
  try {
    const [result, ...meta] = await pool.query(
      SQL_QUERIES.team.assignRoleToUserInTeamQuery,
      [teamId, profileId, roleId]
    );
    return result;
  } catch (err) {
    throw new Error(`Failed to assign role to Team: ${err.message}`);
  }
}

async function updateUserRoleInTeam(roleId, userTeamRoleId) {
  try {
    const [result, ...meta] = await pool.query(
      SQL_QUERIES.team.updateUserRoleInTeamQuery,
      [roleId, userTeamRoleId]
    );
    return result;
  } catch (err) {
    throw new Error(`Failed to update role to Team: ${err.message}`);
  }
}

async function getAllTeamsWithUsers() {
  try {
    const query = `SELECT up.fname AS first_name, up.lname AS last_name, up.profileId as user_profile_id, t.teamName AS team_name, t.teamId as team_id, r.roleName AS role_name, r.roleId as role_id
        FROM user_profile up
        JOIN user_team_role utr ON up.profileId = utr.profileId
        JOIN team t ON utr.teamId = t.teamId
        JOIN role r ON utr.roleId = r.roleId;`;
    const [data, ...meta] = await pool.query(
      SQL_QUERIES.team.getAllTeamsWithUsersQuery
    );
    return data;
  } catch (err) {
    throw new Error(`Failed to get Teams with users: ${err.message}`);
  }
}

async function deleteUserFromTeam(teamId, profileId) {
  try {
    const query = `delete from user_team_role where teamId = ? and profileId = ?`;
    const [data, ...meta] = await pool.query(query, [teamId, profileId]);
    return data;
  } catch (err) {
    throw new Error(`Failed to get Teams with users: ${err.message}`);
  }
}

export {
  createTeam,
  getTeams,
  getTeamById,
  getTeamWithUsersById,
  updateTeam,
  assignUserRoleInTeam,
  updateUserRoleInTeam,
  getAllTeamsWithUsers,
  deleteUserFromTeam,
};
