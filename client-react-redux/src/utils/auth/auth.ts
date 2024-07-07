import { jwtDecode } from 'jwt-decode';
import {getSessionStorage} from '../../utils/storage/storage';

interface TokenPayload {
    accessToken: string;
    refreshToken: string;
    expireTime: number;
    expiresIn: number;
    // Add any other fields that your JWT payload contains
}

class Auth {

    BASE_URL = 'http://localhost:3000/api';

    postRequestOption(data: string) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: data,
        };
        return requestOptions;
    }

    login(reqPayload: {username: string, password: string}) {
        const raw = JSON.stringify(reqPayload);
        const requestOptions = this.postRequestOption(raw);
        return fetch(`${this.BASE_URL}/auth/login`, requestOptions).then(resp => resp.text());
    }

    refreshToken() {

    }

    getLoginDetail(){
        return JSON.parse(getSessionStorage('login'));
    }

    isLoggedIn() {
        const loginDetail = this.getLoginDetail();
        if(loginDetail?.tokens?.expiresIn && (new Date().getTime()) < loginDetail?.tokens?.expireTime) {
          return true;
        }
        return false;
    }

    getUserDetail() {
        const loginDetail = this.getLoginDetail();
        let decoded;
        if(loginDetail) {
            decoded = jwtDecode<TokenPayload>(loginDetail.tokens.accessToken);
            // decoded = jwt.verify(loginDetail.tokens.accessToken, 'ACCESS_TOKEN_SECRET');
        }
        return decoded;
    }

}

const AuthUtil = new Auth();

export { AuthUtil };