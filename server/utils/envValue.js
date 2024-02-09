import dotenv from 'dotenv';

dotenv.config();



export function getEnvValue(key) {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
    const HOST = process.env.HOST;
    const USERNAME = process.env.USERNAME;
    const PASSWORD = process.env.PASSWORD;
    const DATABASE = process.env.DATABASE;

    const ENV_VALUE_MAP = {
        ACCESS_TOKEN_SECRET,
        REFRESH_TOKEN_SECRET,
        HOST,
        USERNAME,
        PASSWORD,
        DATABASE,
    };
    return ENV_VALUE_MAP[key];
}