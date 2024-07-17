import { jwtDecode } from 'jwt-decode';
import { getSessionStorage } from '../storage';

interface TokenPayload {
  accessToken: string;
  refreshToken: string;
  expireTime: number;
  expiresIn: number;
  fname: string;
  lname: string;
  username: string;
  roleName: string;
  roleId: number;

  // Add any other fields that your JWT payload contains
}

class Auth {
  BASE_URL = 'http://localhost:3000/api';

  postRequestOption(data: string) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    return {
      method: 'POST',
      headers: myHeaders,
      body: data,
    };
  }

  login(reqPayload: { username: string; password: string }) {
    const raw = JSON.stringify(reqPayload);
    const requestOptions = this.postRequestOption(raw);
    return fetch(`${this.BASE_URL}/auth/login`, requestOptions).then((resp) =>
      resp.text()
    );
  }

  refreshToken() {}

  getLoginDetail() {
    return getSessionStorage('login');
  }

  getParsedLoginDetail(loginDetailText: string | null) {
    return loginDetailText ? JSON.parse(loginDetailText) : null;
  }

  isLoggedIn() {
    const loginDetailText = this.getLoginDetail();
    const loginDetail = this.getParsedLoginDetail(loginDetailText);
    if (
      loginDetail?.tokens?.expiresIn &&
      new Date().getTime() < loginDetail?.tokens?.expireTime
    ) {
      return true;
    }
    return false;
  }

  getUserDetail() {
    const loginDetailText = this.getLoginDetail();
    const loginDetail = this.getParsedLoginDetail(loginDetailText);
    let decoded;
    if (loginDetail) {
      decoded = jwtDecode<TokenPayload>(loginDetail.tokens.accessToken);
      // decoded = jwt.verify(loginDetail.tokens.accessToken, 'ACCESS_TOKEN_SECRET');
    }
    return decoded;
  }
}

const AuthUtil = new Auth();

export { AuthUtil };
