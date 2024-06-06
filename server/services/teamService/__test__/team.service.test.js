import {pool} from '../../../config/dbConfig/database.js';
import * as teamService from '../team.service.js';
import {SQL_QUERIES} from '../../../utils/queries.js';


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
  
        expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.team.getTeamByIdQuery, [teamId]);
        expect(teamData).toEqual(mockUserData);
      });

  
      it('should throw an error when database query fails', async () => {
        // Mock query error
        const errorMessage = 'Database error';
        pool.query.mockRejectedValueOnce(new Error(errorMessage));
  
        const teamId = 1;
        await expect(teamService.getTeams(teamId)).rejects.toThrow(`Failed to get teams: ${errorMessage}`);
      });
    });

    describe('getTeams', () => {
        it('should return team list', async () => {
          // Mock query result
          const mockTeamData = [{"teamId": 1, "teamName": "NEXT GEN TEAM", "createdAt": "2024-02-10T13:21:45.184Z"}, {"teamId": 2, "teamName": "OPDS", "createdAt": "2024-02-04T13:20:14.184Z"}];
          pool.query.mockResolvedValueOnce([mockTeamData]);
    
          const teamData = await teamService.getTeams();
    
          expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.team.getTeamsQuery);
          expect(teamData).toEqual(mockTeamData);
        });
  
    
        it('should throw an error when database query fails', async () => {
          // Mock query error
          const errorMessage = 'Database error';
          pool.query.mockRejectedValueOnce(new Error(errorMessage));
    
          expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.team.getTeamsQuery);
          await expect(teamService.getTeams()).rejects.toThrow(`Failed to get teams: ${errorMessage}`);
        });
      });

  });
