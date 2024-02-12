import {createUserLoginController, getUserByIdController, updateUserProfileController, getUsersController} from '../user.controller.js';
import * as userService from '../../../services/userService/user.service.js';

jest.mock('../../../services/userService/user.service.js', () => ({
    createUserLogin: jest.fn(),
    updateUserProfile: jest.fn(),
    getUserById: jest.fn(),
    getUsers: jest.fn(),
}));


describe('User Controller', () => {
    
    describe('createUserLogin', () => {
        it('should create a user Login and profile', async () => {
            const mock = {
                "userId": 1,
                "fname": "user",
                "lname": "s",
                "role": "somerole"
            };
            
            // Mock the userService function to return mockValue
            userService.createUserLogin.mockResolvedValueOnce(mock);
            
            const req = { body: { fname: 'John', lname: 'Doe', role: 'user', username: "jays", password: "12345" } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await createUserLoginController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mock);
        });
    });

    describe('Update user profile', () => {
        it('should update profile', async () => {
            
            // Mock the userService function to return mockValue
            userService.updateUserProfile.mockResolvedValueOnce(true);

            const req = { body: {"userId": 1, "fname": "Rajeev", "lname": "s"}, params: {id: 1} };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await updateUserProfileController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'User profile updated successfully' });  
        })
    });    

    describe('GET /users/:id', () => {
        it('should get user by id', async () => {
            const mock = {
                "userId": 1,
                "username": "testuser",
                "createdAt": "2024-02-08T15:43:39.037Z",
                "password": "23424321m34213423k4"
              };
            
            
            // Mock the userService function to return mockValue
            userService.getUserById.mockResolvedValueOnce(mock);

            const req = { params: {id: 1} };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getUserByIdController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should return a empty arr if user with the given ID is not found', async () => {
            // Mock the userService function to return undefined (user not found)
            userService.getUserById.mockResolvedValueOnce([]);
      
            // Mock request and response objects
            const req = { params: { id: '999' } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };
      
            // Call the controller function
            await getUserByIdController(req, res);
      
            // Expectations
            expect(userService.getUserById).toHaveBeenCalledWith('999');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
          });
    });

    describe('GET /getAllUsers', () => {
        it('should return all users', async () => {
            const mock = [{
                "userId": 1,
                "username": "User1",
                "fname": "John",
                "lname": "S",
                "role": "Admin"
              }];
            
            
            // Mock the userService function to return mockValue
            userService.getUsers.mockResolvedValueOnce(mock);

            const req = {};
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getUsersController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

    });


   
});        