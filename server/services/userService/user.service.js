import {pool} from '../../config/dbConfig/database.js';
import { encodePassword } from '../../utils/bcrypt.js'

    async  function createUserLogin(userData) {
        const {fname, lname, username, password, role} = userData;
        const encodedPassword = encodePassword(password);
        console.log({fname, lname, username, password, role});
        try{
            const [result] = await pool.query(`insert into users (username, password, createdAt) values(?,?,?)`, [username, encodedPassword, new Date().toISOString()]);
            await createUserProfile({fname, lname, role, userId: result.insertId});
            return { userId: result.insertId, fname, lname, role };
        } catch(err) {
            throw new Error(`Failed to create User Login: ${err.message}`);
        };
        
    }

    async function createUserProfile(userData) {
        const {fname, lname, role, userId} = userData;
        try {
            const [result, ...meta] = await pool.query(`insert into user_profile (fname, lname, role, userId, createdAt) values(?,?,?,?,?)`, [fname, lname, role, userId, new Date().toISOString()]);
            return result.insertId;
        } catch(err) {
            throw new Error(`Failed to create User Profile: ${err.message}`);
        };
    }

    async function  updateUserProfile(userData, userId) {
        try {

            const query = "Update user_profile SET " + Object.keys(userData).map(key => `${key} = ?`).join(',')+ " WHERE userId = ?";
            const params = [...Object.values(userData), userId];
            const result = await pool.query(query, params);
        
            return result;
        } catch(err) {
            throw new Error(`Failed to update User Profile: ${err.message}`);
        };
    }

    async function  getUsers() {
        try {
            const [data, ...meta] = await pool.query("SELECT users.userId, users.username, user_profile.fname, user_profile.lname, user_profile.role FROM users INNER JOIN user_profile ON users.userId=user_profile.userId");
            return data;
        } catch(err) {
            throw new Error(`Failed to get User detail: ${err.message}`);
        };
    }

    async function  getUserById(id) {
        try {
            const [data, ...meta] = await pool.query(`select * from users where userId = ?`, [id]);
            return data;
        } catch(err) {
            throw new Error(`Failed to get User by id: ${err.message}`);
        };
    }
export { getUsers, getUserById, createUserLogin, updateUserProfile };