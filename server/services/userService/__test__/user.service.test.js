import {pool} from '../../../config/dbConfig/database.js';
import * as userService from '../user.service.js';

// Mock environment values
jest.mock('../../../config/dbConfig/database.js', () => ({
    pool: {
        query: jest.fn()
      }
  }));
  
  describe('User Service', () => {
    describe('getUserById', () => {
      it('should return user data when user ID exists', async () => {
        // Mock query result
        const mockUserData = [{ userId: 1, name: 'John' }];
        pool.query.mockResolvedValueOnce([mockUserData]);
  
        const userId = 1;
        const userData = await userService.getUserById(userId);
  
        expect(pool.query).toHaveBeenCalledWith(`select * from users where userId = ?`, [userId]);
        expect(userData).toEqual(mockUserData);
      });

  
      it('should throw an error when database query fails', async () => {
        // Mock query error
        const errorMessage = 'Database error';
        pool.query.mockRejectedValueOnce(new Error(errorMessage));
  
        const userId = 1;
        await expect(userService.getUserById(userId)).rejects.toThrow(`Failed to get User by id: ${errorMessage}`);
      });
    });

    describe('getAllUsers', () => {
        it('should return user list', async () => {
          // Mock query result
          const mockUserData = [{ userId: 1, name: 'John' }, { userId: 2, name: 'Sid' }];
          pool.query.mockResolvedValueOnce([mockUserData]);
    
          const userData = await userService.getUsers();
    
          expect(pool.query).toHaveBeenCalledWith('SELECT users.userId, users.username, user_profile.fname, user_profile.lname, user_profile.role FROM users INNER JOIN user_profile ON users.userId=user_profile.userId');
          expect(userData).toEqual(mockUserData);
        });
  
    
        it('should throw an error when database query fails', async () => {
          // Mock query error
          const errorMessage = 'Database error';
          pool.query.mockRejectedValueOnce(new Error(errorMessage));
    
          expect(pool.query).toHaveBeenCalledWith('SELECT users.userId, users.username, user_profile.fname, user_profile.lname, user_profile.role FROM users INNER JOIN user_profile ON users.userId=user_profile.userId');
          await expect(userService.getUsers()).rejects.toThrow(`Failed to get User detail: ${errorMessage}`);
        });
      });


  });
