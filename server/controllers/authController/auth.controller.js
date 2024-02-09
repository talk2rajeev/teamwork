import jwt from 'jsonwebtoken';
import * as authService from '../../services/authService/auth.service.js';
import { comparePasswrod } from '../../utils/bcrypt.js'
import {EXPIRE_TIME} from '../../utils/constants.js';
import {generateAccessToken, generateRefreshToken} from '../../utils/tokenGenerator.js';
import { getEnvValue } from '../../utils/envValue.js';


async function login(req, res) {
    const { username, password } = req.body;
    
    const users = await authService.findUserByUsername(username);
    console.log(users);
    
    const user = users.find(u => u.username === username);

    if (!user || !comparePasswrod(password, user.password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    delete user.password;
    const accessToken = generateAccessToken({ ...user });
    const refreshToken = generateRefreshToken({ ...user });
    res.json({ accessToken, refreshToken, expiresIn: `${EXPIRE_TIME} minutes` });
};

function token(req, res) {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);

    const v = jwt.verify(refreshToken, getEnvValue('REFRESH_TOKEN_SECRET'));
};

export { login, token };