import {pool} from '../../database.js';

async function createNewUser(userData) {
    const {fname, lname, username, password, role} = userData;
    console.log({fname, lname, username, password, role});
    const [user, ...meta] = await pool.query(`insert into users (fname, lname, username, password, role) values(?,?,?,?,?)`, [fname, lname, username, password, role]).catch(err => console.log(err));
    return user;
}

async function getUsers() {
    const [data, ...meta] = await pool.query("select * from users").catch(err => console.log(err));
    return data;
}

async function getUserById(id) {
    const [data, ...meta] = await pool.query(`select * from users where userId = ?`, [id]).catch(err => console.log(err));
    return data;
}

async function createUser(fname, lname, age, dob) {
    const [result] = await pool.query(`insert into users (firstName, lastName, age, dob) values(?,?,?,?)`, [fname, lname, age, dob]).catch(err => console.log(err));
    const insertedId =  result.insertId;
    return getUserById(insertedId);
}

export { getUsers, getUserById, createUser, createNewUser };