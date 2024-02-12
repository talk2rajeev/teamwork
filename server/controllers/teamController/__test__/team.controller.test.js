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

    describe('Update Team', () => {
        it('should update team name', async () => {
            
            // Mock the userService function to return mockValue
            teamService.updateTeam.mockResolvedValueOnce(true);

            const req = { body: {"teamName": "New Team"}, params: {id: 1} };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await updateTeamController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Team updated successfully' });  
        })
        it('should throw an error when updating user', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            teamService.updateTeam.mockRejectedValueOnce(new Error(errorMessage));
      
            const req = { body: { teamName: 'New NEXT GEN TEAM' }, params: {id: 1} };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            await updateTeamController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(teamService.createTeam).toHaveBeenCalledWith("NEXT GEN TEAM");
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });    

    describe('GET /team/:id', () => {
        it('should get team by id', async () => {
            const mock = {
                "teamId": 1,
                "teamName": "test team",
                "createdAt": "2024-02-08T15:43:39.037Z",
              };
            
            
            // Mock the userService function to return mockValue
            teamService.getTeamById.mockResolvedValueOnce(mock);

            const req = { params: {id: 1} };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getTeamByIdController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should return a empty arr if team with the given ID is not found', async () => {
            // Mock the userService function to return undefined (user not found)
            teamService.getTeamById.mockResolvedValueOnce([]);
      
            // Mock request and response objects
            const req = { params: { id: '999' } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };
      
            // Call the controller function
            await getTeamByIdController(req, res);
      
            // Expectations
            expect(teamService.getTeamById).toHaveBeenCalledWith('999');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
          });
    });

    describe('GET /getAllTeams', () => {
        it('should return all teams', async () => {
            const mock = [{
                "teamId": 1,
                "teamName": "test team",
                "createdAt": "2024-02-08T15:43:39.037Z",
              },
              {
                "teamId": 2,
                "teamName": "test team 2",
                "createdAt": "2024-02-08T15:43:39.037Z",
              }];
            
            
            // Mock the userService function to return mockValue
            teamService.getTeams.mockResolvedValueOnce(mock);

            const req = {};
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getTeamsController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

    });


   
});        