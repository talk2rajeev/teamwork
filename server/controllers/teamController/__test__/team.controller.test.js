import {createTeamController, updateTeamController, getTeamByIdController, getTeamsController} from '../team.controller.js';
import * as teamService from '../../../services/teamService/team.service.js';

jest.mock('../../../services/teamService/team.service.js', () => ({
    createTeam: jest.fn(),
    updateTeam: jest.fn(),
    getTeamById: jest.fn(),
    getTeams: jest.fn(),
}));


describe('Team Controller', () => {
    
    describe('create Team', () => {
        it('should create a team', async () => {
            const mock = {"teamId": 1, "teamName": "NEXT GEN TEAM", "createdAt": "2024-02-10T13:21:45.184Z"};
            
            teamService.createTeam.mockResolvedValueOnce(mock);
            
            const req = { body: { teamId: 1, teamName: 'NEXT GEN TEAM' } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await createTeamController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should throw an error when create user fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            teamService.createTeam.mockRejectedValueOnce(new Error(errorMessage));
      
            const req = { body: { teamId: 1, teamName: 'NEXT GEN TEAM' } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            await createTeamController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(teamService.createTeam).toHaveBeenCalledWith("NEXT GEN TEAM");
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // describe('Update Team', () => {
    //     it('should update team name', async () => {
            
    //         // Mock the userService function to return mockValue
    //         teamService.updateTeam.mockResolvedValueOnce(true);

    //         const req = { body: {"teamName": "New Team"}, params: {id: 1} };
    //         const res = {
    //           status: jest.fn().mockReturnThis(),
    //           json: jest.fn()
    //         };

    //         // Call the controller function
    //         await updateTeamController(req, res);

    //         // Expectations
    //         expect(res.status).toHaveBeenCalledWith(200);
    //         expect(res.json).toHaveBeenCalledWith({ message: 'Team updated successfully' });  
    //     })
    // });    

    // describe('GET /users/:id', () => {
    //     it('should get user by id', async () => {
    //         const mock = {
    //             "userId": 1,
    //             "username": "testuser",
    //             "createdAt": "2024-02-08T15:43:39.037Z",
    //             "password": "23424321m34213423k4"
    //           };
            
            
    //         // Mock the userService function to return mockValue
    //         userService.getUserById.mockResolvedValueOnce(mock);

    //         const req = { params: {id: 1} };
    //         const res = {
    //           status: jest.fn().mockReturnThis(),
    //           json: jest.fn()
    //         };

    //         // Call the controller function
    //         await getUserByIdController(req, res);

    //         // Expectations
    //         expect(res.status).toHaveBeenCalledWith(200);
    //         expect(res.json).toHaveBeenCalledWith(mock);
    //     });

    //     it('should return a empty arr if user with the given ID is not found', async () => {
    //         // Mock the userService function to return undefined (user not found)
    //         userService.getUserById.mockResolvedValueOnce([]);
      
    //         // Mock request and response objects
    //         const req = { params: { id: '999' } };
    //         const res = {
    //           status: jest.fn().mockReturnThis(),
    //           json: jest.fn()
    //         };
      
    //         // Call the controller function
    //         await getUserByIdController(req, res);
      
    //         // Expectations
    //         expect(userService.getUserById).toHaveBeenCalledWith('999');
    //         expect(res.status).toHaveBeenCalledWith(200);
    //         expect(res.json).toHaveBeenCalledWith([]);
    //       });
    // });

    // describe('GET /getAllUsers', () => {
    //     it('should return all users', async () => {
    //         const mock = [{
    //             "userId": 1,
    //             "username": "User1",
    //             "fname": "John",
    //             "lname": "S",
    //             "role": "Admin"
    //           }];
            
            
    //         // Mock the userService function to return mockValue
    //         userService.getUsers.mockResolvedValueOnce(mock);

    //         const req = {};
    //         const res = {
    //           status: jest.fn().mockReturnThis(),
    //           json: jest.fn()
    //         };

    //         // Call the controller function
    //         await getUsersController(req, res);

    //         // Expectations
    //         expect(res.status).toHaveBeenCalledWith(200);
    //         expect(res.json).toHaveBeenCalledWith(mock);
    //     });

    // });


   
});        