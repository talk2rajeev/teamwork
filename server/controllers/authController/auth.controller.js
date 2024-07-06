import jwt from 'jsonwebtoken';
import * as authService from '../../services/authService/auth.service.js';
import { comparePasswrod } from '../../utils/bcrypt.js'
import {EXPIRE_TIME} from '../../utils/constants.js';
import {generateAccessToken, generateRefreshToken} from '../../utils/tokenGenerator.js';
import { getEnvValue } from '../../utils/envValue.js';
import moment from 'moment';


async function login(req, res) {
    const { username, password } = req.body;
    
    const users = await authService.findUserByUsername(username);
    const user = users.find(u => u.username === username);
    
    if (!user || !comparePasswrod(password, user.password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const userWithDetail = await authService.getUserDetail(user.loginId);

    const userTeams = userWithDetail.map(u => ({teamId: u.teamId, teamName: u.teamName, roleId: u.roleId, roleName: u.roleName}));
    const fname = userWithDetail[0]?.fname;
    const lname = userWithDetail[0]?.lname;
   
    
    delete user.password; 
    const expireTime = moment().add(EXPIRE_TIME, 'seconds').valueOf();
    const expiresIn = `${EXPIRE_TIME} seconds`;
    const userData = {...user, fname, lname, userTeams, expireTime, expiresIn};

    const accessToken = generateAccessToken({ ...userData });
    const refreshToken = generateRefreshToken({ ...userData });
    

    res
    // .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
    // .header('Authorization', accessToken)
    .json({ accessToken, refreshToken, expireTime, expiresIn: `${EXPIRE_TIME} seconds` });
};

function token(req, res) {
    // const refreshToken = req.body.token;
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }

    try {
      const decoded = jwt.verify(refreshToken, 'REFRESH_TOKEN_SECRET');
      const accessToken = jwt.sign({ user: decoded.user }, 'ACCESS_TOKEN_SECRET', { expiresIn: '1h' });
  
      res
        .header('Authorization', accessToken)
        .send(decoded.user);
    } catch (error) {
      return res.status(400).send('Invalid refresh token.');
    }
};

export { login, token };