const BASE_PATH = 'http://localhost:3000';
const BASE_ROUTE = 'api';

const API: {[key: string]: string} = {
    LOGIN: 'auth/login',
}

export function login(reqPayload: {username: string, password: string}) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(reqPayload);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };
    const URL = `${BASE_PATH}/${BASE_ROUTE}/${API.LOGIN}`;
    return fetch(URL, requestOptions).then(resp => resp.text());
}

export function get(apiName: string, params: {[key: string]: string}) {
    const qs = Object.entries(params).map(a => a.join('=')).join('&');
    let URL = `${BASE_PATH}/${BASE_ROUTE}/${API[apiName]}`;
    if(qs) {
        URL = `${URL}?${qs}`;
    }
    return fetch(URL).then(resp => resp.text());
}