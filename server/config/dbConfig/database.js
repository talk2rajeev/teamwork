import mysql from 'mysql2';
import { getEnvValue } from '../../utils/envValue.js';

const pool = mysql.createPool({
    host: getEnvValue('HOST'),
    user: getEnvValue('USERNAME'),
    password: getEnvValue('PASSWORD'),
    database: getEnvValue('DATABASE')
}).promise();

export {pool};


