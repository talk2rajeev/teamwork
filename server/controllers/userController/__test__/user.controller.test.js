import sinon from 'sinon';
import UserService from '../../../services/userService/user.service.js';
import {app } from '../../../app.js';
import request from 'supertest';

// const userService = new UserService();

jest.mock('../../../services/userService/user.service.js', () => ({
    createUserLogin: jest.fn()
}));


describe('createUserLogin', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should save a user profile', async () => {
        //const userProfileService = require('../userProfileService');
        
        UserService.saveUserProfile.mockResolvedValueOnce(1);

        const response = await request(app)
            .post('/api/user/')
            .send({ fname: 'John', lname: 'Doe', role: 'user' });

        expect(response.statusCode).toBe(201);
        expect(response.body.userId).toBe(1);
        expect(userProfileService.saveUserProfile).toHaveBeenCalledWith('John', 'Doe', 'user');
    });

    // describe('createUserLogin ...', () => {
    //     it('should save a user profile', async () => {
    //         const stub = sinon.stub(UserService, 'createUserLogin').resolves(1);

    //         const res = await app.inject({
    //             method: 'POST',
    //             url: '/api/user/',
    //             payload: JSON.stringify({ fname: 'John', lname: 'Doe', role: 'user' })
    //         });

    //         expect(res.statusCode).toBe(201);
    //         expect(JSON.parse(res.payload)).toHaveProperty('userId', 1);
    //         expect(stub.calledOnceWith('John', 'Doe', 'user')).toBeTruthy();
    //     });
    // });    
});        