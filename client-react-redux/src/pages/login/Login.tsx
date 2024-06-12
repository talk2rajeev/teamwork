import React, {useState} from 'react';
import { FaBug } from "react-icons/fa";
import * as coreComponents from '../../components/core-components';
import { Logo } from '../../components/logo/Logo';

const Login: React.FC =() =>{
    const inputNames = {
        userName: 'username',
        password: 'password',
    };

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const btnClick = () => {
        const reqPayload = {username, password};
        console.log(reqPayload);
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>, data: any) => {
        if(event.target.name === inputNames.userName) {
            setUsername(event.target.value);
        }
        if(event.target.name === inputNames.password) {
            setPassword(event.target.value);
        }
    }
    
    const isLoginButtonDisabled = (username === '' || username.length < 5) || (password === '' || password.length < 5);

    return (
        <div className='h-screen bg-gray-100 flex justify-center'>
            <div className='w-96 bg-white p-7 self-center'>
                <div className='flex justify-center pb-4'>
                    <Logo />
                </div>
                <div className='p-2'>
                    <coreComponents.Input 
                        type='text'
                        name={inputNames.userName}
                        placeholder='Username'
                        onchange={onInputChange}
                    />
                </div>
                <div className='p-2'>
                    <coreComponents.Input 
                        type='password'
                        name={inputNames.password}
                        placeholder='Password'
                        onchange={onInputChange}
                    />
                </div>
                <div className='p-2'>
                    <coreComponents.Button 
                        label="Login"
                        type="primary"
                        clickHandler={btnClick}
                        disabled={isLoginButtonDisabled}
                    />
                </div>
                {/* <div className='p-2'>
                    <coreComponents.Input 
                        label='Address'
                        required={true}
                        error='Hey, wait fot me. This is Address field cant be empty. !Address field cant be empty !!!'
                        type='text'
                        placeholder='test'
                        data={[1,2,3,4,5]}
                        dataAttribute='123'
                        onchange={(e, d)=>{console.log(e.target.value, e.target.dataset)}}
                    />
                </div>
                
                <div className='p-2'>
                    <coreComponents.Button 
                        label="Error"
                        type="error"
                        clickHandler={btnClick}
                        disabled={true}
                    />
                </div>
                <div className='p-2'>
                    <coreComponents.Button 
                        label="Primary"
                        type="primary"
                        clickHandler={btnClick}
                    />
                </div>
                
                <div className='p-2'>
                    <coreComponents.Button 
                        label="default"
                        type="default"
                        clickHandler={btnClick}
                    />
                </div>
                <div className='p-2'>
                    <coreComponents.Button 
                        label="success"
                        type="success"
                        clickHandler={btnClick}
                        disabled={true}
                    />
                </div>
                <div className='p-2'>
                    <coreComponents.Button 
                        label="warning"
                        type="warning"
                        clickHandler={btnClick}
                    />
                </div>
                <div className='p-2'>
                    <coreComponents.Button 
                        label="error"
                        type="error"
                        clickHandler={btnClick}
                        disabled={true}
                        loading={true}
                    />
                </div> */}
            </div>
        </div>
    );
}

export default Login;
