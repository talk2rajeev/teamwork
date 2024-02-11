import {pool} from '../../config/dbConfig/database.js';

async function createTeam(teamName) {
    try{
        const [result, ...meta] = await pool.query(`insert into team (teamName, createdAt) values(?,?)`, [teamName, new Date().toISOString()]);
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
        throw new Error(`Failed to update User Profile: ${err.message}`);
    };
}

export { createTeam, getTeams, getTeamById, updateTeam };