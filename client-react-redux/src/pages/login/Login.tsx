import React, { useEffect, useState } from 'react';
import { FaBug } from 'react-icons/fa';
import * as coreComponents from '../../components/core-components';
import { loginAsync, logout, loginDetails } from './loginSlice';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import { Logo } from '../../components/appComponents/logo/Logo';
import { redirect, useNavigate } from 'react-router-dom';

const inputNames = {
  userName: 'username',
  password: 'password',
};

const Login: React.FC = () => {
  const loginDetail = useAppSelector(loginDetails);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = () => {
    const reqPayload = { username, password };
    console.log(reqPayload);
    dispatch(loginAsync(reqPayload));
  };

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) => {
    if (event.target.name === inputNames.userName) {
      setUsername(event.target.value);
    }
    if (event.target.name === inputNames.password) {
      setPassword(event.target.value);
    }
  };

  useEffect(() => {
    if (loginDetail.tokens?.expireTime) {
      navigate('/dashboard');
    }
  }, [loginDetail]);

  const isLoginButtonDisabled =
    username === '' ||
    username.length < 5 ||
    password === '' ||
    password.length < 5;
  const loading = loginDetail?.status === 'loading';

  return (
    <div className="h-screen bg-gray-100 flex justify-center">
      <div className="w-96 bg-white p-7 self-center">
        <div className="flex justify-center pb-4">
          <Logo />
        </div>
        <div className="p-2">
          <coreComponents.Input
            type="text"
            name={inputNames.userName}
            placeholder="Username"
            onchange={onInputChange}
          />
        </div>
        <div className="p-2">
          <coreComponents.Input
            type="password"
            name={inputNames.password}
            placeholder="Password"
            onchange={onInputChange}
          />
        </div>
        <div className="p-2">
          <coreComponents.Button
            label="Login"
            type="primary"
            clickHandler={login}
            disabled={isLoginButtonDisabled}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
