import {pool} from '../../config/dbConfig/database.js';

async function createRole(roleName, createdById) {
    try{
        const [result, ...meta] = await pool.query(`insert into role (roleName, createdById) values(?, ?)`, [roleName, createdById]);
        return result;
    } catch(err) {
        throw new Error(`Failed to create role: ${err.message}`);
    };
    
}

async function getRoles() {
    try {
        console.log('get Roles service called');
        const [data, ...meta] = await pool.query("SELECT role.roleId, role.roleName, user_profile.profileId, user_profile.fname, user_profile.lname from role INNER JOIN user_profile ON role.createdById = user_profile.profileId");
        return data;
    } catch(err) {
        throw new Error(`Failed to get roles: ${err.message}`);
    };
}

async function  getRoleById(id) {
    try {
        const [data, ...meta] = await pool.query(`SELECT role.roleId, role.roleName, user_profile.profileId, user_profile.fname, user_profile.lname from role INNER JOIN user_profile ON role.createdById = user_profile.profileId where roleId = ?`, [id]);
        return data;
    } catch(err) {
        throw new Error(`Failed to get Role by id: ${err.message}`);
    };
}

async function  updateRole(roleName, roleId) {
    try {
        const result = await pool.query("Update role SET roleName = ? WHERE roleId = ?", [roleName, roleId]);
        return result;
    } catch(err) {
        throw new Error(`Failed to update Role: ${err.message}`);
    };
}

export { createRole, getRoles, getRoleById, updateRole };