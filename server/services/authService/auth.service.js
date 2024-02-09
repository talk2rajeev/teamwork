import {pool} from '../../config/dbConfig/database.js';

async function findUserByUsername(username) {
    const [users, ...meta] = await pool.query(`select * from users where username = ?`, [username]).catch(err => console.log(err));
    return users;
}

export { findUserByUsername }