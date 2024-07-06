import jwt from 'jsonwebtoken';
import {EXPIRE_TIME} from './constants.js';
import { getEnvValue } from './envValue.js';

const ACCESS_TOKEN_SECRET = getEnvValue('ACCESS_TOKEN_SECRET');
const REFRESH_TOKEN_SECRET = getEnvValue('REFRESH_TOKEN_SECRET');

export function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: `${EXPIRE_TIME}m` });
}

export function generateRefreshToken(user) {
    return jwt.sign({ ...user }, REFRESH_TOKEN_SECRET, { expiresIn: `${EXPIRE_TIME}m` });
}