// A mock function to mimic making an async request for data
export function login(reqPayload: { username: string; password: string }) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify(reqPayload);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  return fetch('http://localhost:3000/api/auth/login', requestOptions).then(
    (resp) => resp.text()
  );
}

// A mock function to mimic making an async request for data
export function logoutAsyncApi() {
  return new Promise<boolean>((resolve) =>
    setTimeout(() => resolve(true), 500)
  );
}
