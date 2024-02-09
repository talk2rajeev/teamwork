import jwt from 'jsonwebtoken';
import { getEnvValue } from '../../utils/envValue.js';


const ACCESS_TOKEN_SECRET = getEnvValue('ACCESS_TOKEN_SECRET');

export function authenticateToken(req, res, next) {
    console.log(req.baseUrl, ' ', req.originalUrl);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}