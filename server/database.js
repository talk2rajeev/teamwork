import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'MySql@123',
    database: 'teamwork'
}).promise();

export {pool};


