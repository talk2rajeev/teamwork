import {pool} from '../../../config/dbConfig/database.js';
import * as teamService from '../team.service.js';

// Mock environment values
jest.mock('../../../config/dbConfig/database.js', () => ({
    pool: {
        query: jest.fn()
      }
  }));
  
  describe('Team Service', () => {
    describe('getTeamById', () => {
      it('should return user data when user ID exists', async () => {
        // Mock query result
        const mockUserData = [{"teamId": 1, "teamName": "NEXT GEN TEAM", "createdAt": "2024-02-10T13:21:45.184Z"}];
        pool.query.mockResolvedValueOnce([mockUserData]);
  
        const teamId = 1;
        const teamData = await teamService.getTeamById(teamId);
  
        expect(pool.query).toHaveBeenCalledWith(`select * from team where teamId = ?`, [userId]);
        expect(teamData).toEqual(mockUserData);
      });

  
      it('should throw an error when database query fails', async () => {
        // Mock query error
        const errorMessage = 'Database error';
        pool.query.mockRejectedValueOnce(new Error(errorMessage));
  
        const teamId = 1;
        await expect(teamService.getTeamById(teamId)).rejects.toThrow(`Failed to get Team by id: ${errorMessage}`);
      });
    });

    describe('getAllTeams', () => {
        it('should return team list', async () => {
          // Mock query result
          const mockUserData = [{"teamId": 1, "teamName": "NEXT GEN TEAM", "createdAt": "2024-02-10T13:21:45.184Z"}, {"teamId": 2, "teamName": "OPDS", "createdAt": "2024-02-04T13:20:14.184Z"}];
          pool.query.mockResolvedValueOnce([mockUserData]);
    
          const teamData = await userService.getUsers();
    
          expect(pool.query).toHaveBeenCalledWith('SELECT * from team');
          expect(teamData).toEqual(mockUserData);
        });
  
    
        it('should throw an error when database query fails', async () => {
          // Mock query error
          const errorMessage = 'Database error';
          pool.query.mockRejectedValueOnce(new Error(errorMessage));
    
          expect(pool.query).toHaveBeenCalledWith('SELECT * from team');
          await expect(teamService.getTeams()).rejects.toThrow(`Failed to get teams: ${errorMessage}`);
        });
      });

  });
