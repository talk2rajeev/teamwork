import {pool} from '../../config/dbConfig/database.js';

async function createTeam(teamName, createdById) {
    try{
        const [result, ...meta] = await pool.query(`insert into team (teamName, createdById) values(?, ?)`, [teamName, createdById]);
        return result;
    } catch(err) {
        throw new Error(`Failed to create team: ${err.message}`);
    };
    
}

async function  getTeams() {
    try {
        const [data, ...meta] = await pool.query("SELECT * from team");
        return data;
    } catch(err) {
        throw new Error(`Failed to get teams: ${err.message}`);
    };
}

async function  getTeamById(id) {
    try {
        const [data, ...meta] = await pool.query(`select * from team where teamId = ?`, [id]);
        return data;
    } catch(err) {
        throw new Error(`Failed to get Team by id: ${err.message}`);
    };
}

async function  updateTeam(teamName, teamId) {
    try {
        const result = await pool.query("Update team SET teamName = ? WHERE teamId = ?", [teamName, teamId]);
        return result;
    } catch(err) {
        throw new Error(`Failed to update team: ${err.message}`);
    };
}

async function assignRoleToTeam(teamId, profileId, roleId) {
    try{
        const [result, ...meta] = await pool.query(`insert into user_team_role (teamId, profileId, roleId) values(?, ?, ?)`, [teamId, profileId, roleId]);
        return result;
    } catch(err) {
        throw new Error(`Failed to assign role to Team: ${err.message}`);
    };
    
}

async function updateUserRoleInTeam(roleId, userTeamRoleId) {
    try{
        const [result, ...meta] = await pool.query(`update user_team_role SET roleId = ? WHERE userTeamRoleId = ?`, [roleId, userTeamRoleId]);
        return result;
    } catch(err) {
        throw new Error(`Failed to update role to Team: ${err.message}`);
    };
}

async function  getAllTeamsWithUsers() {
    try {
        const query = `SELECT up.fname AS first_name, up.lname AS last_name, t.teamName AS team_name, r.roleName AS role_name
        FROM user_profile up
        JOIN user_team_role utr ON up.profileId = utr.profileId
        JOIN team t ON utr.teamId = t.teamId
        JOIN role r ON utr.roleId = r.roleId;`;
        const [data, ...meta] = await pool.query(query);
        return data;
    } catch(err) {
        throw new Error(`Failed to get Teams with users: ${err.message}`);
    };
}


export { createTeam, getTeams, getTeamById, updateTeam, assignRoleToTeam, updateUserRoleInTeam, getAllTeamsWithUsers };