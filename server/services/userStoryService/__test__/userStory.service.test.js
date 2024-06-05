import {pool} from '../../../config/dbConfig/database.js';
import * as userStoryService from '../userStory.service.js';
import {SQL_QUERIES} from '../../../utils/queries.js';


// Mock environment values
jest.mock('../../../config/dbConfig/database.js', () => ({
    pool: {
        query: jest.fn()
      }
}));

const reqPayload = {
    "title": "create user login module",
    "description": "<p>Create a user login module</p>",
    "statusId": 1,
    "assignedToUserId": 1,
    "reporterUserId": 2,
    "userStoryPoint": 5,
    "productId": 1,
    "epicId": 1,
    "sprintId": 1
};
const bugReqPayload = {
    "title": "create user login module",
    "description": "<p>Create a user login module</p>",
    "statusId": 1,
    "assignedToUserId": 1,
    "reporterUserId": 2,
    "userStoryPoint": 5,
    "productId": 1,
    "epicId": 1,
    "sprintId": 1,
    "userStoryType": "bug",
    "priority": "p4"
};

const userStoryData = {
    "userStoryId": 1,
    "title": "create user login module",
    "description": "<p>Create a user login module. It should contain username and password filed. </p><p>Password field should not be less than 8 characters and not more than 16 characters. </p><p>password filed should be combination of:  </p><ol><li>alphabet</li><li>number</li><li>special character</li></ol><p>refer this <a href='https://www.w3schools.com/tags/att_input_type_password.asp' rel='noopener noreferrer' target='_blank'>doc</a> for more detail. </p><p><img src='https://static.lukew.com/hidepass1.png' alt=''> </p>",
    "statusId": 1,
    "assignedToUserId": 1,
    "reporterUserId": 2,
    "createdAt": "2024-05-27T14:08:02.000Z",
    "userStoryPoint": 5,
    "productId": 1,
    "epicId": 1,
    "sprintId": 1,
    "userStoryType": "userStory",
    "isDuplicate": "no",
    "originalStoryId": null,
    "priority": null
};

describe('UserStory Service', () => {
    
    describe('Create userStory/Bug', () => { 
        it('should create story', async () => {
            // Mock query result
            const mockUserStoryData = [{
                ...reqPayload,
            }];
            pool.query.mockResolvedValueOnce([mockUserStoryData]);
            const res = await userStoryService.createUserStory(reqPayload);
            const params = Object.values(reqPayload);

            expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.userStory.createUserStoryQuery, [...params]);
        });
        it('should throw an error when database query fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            pool.query.mockRejectedValueOnce(new Error(errorMessage));
      
            // Expectations
            await expect(userStoryService.createUserStory(reqPayload)).rejects.toThrow(`Failed to create user story: ${errorMessage}`);
        });
        it('should create bug', async () => {
            // Mock query result
            const mockData = [{
                ...bugReqPayload,
            }];
            pool.query.mockResolvedValueOnce([mockData]);
            const res = await userStoryService.createBug(bugReqPayload);
            const params = Object.values(bugReqPayload);

            expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.userStory.createBugQuery, [...params]);
        });
        it('should throw an error when database query fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            pool.query.mockRejectedValueOnce(new Error(errorMessage));
      
            // Expectations
            await expect(userStoryService.createBug(reqPayload)).rejects.toThrow(`Failed to create Bug: ${errorMessage}`);
        });
    });

    describe('update user story', () => {
        it('should update an existing user story', async () => {
          // Mock query result
          const title = "this is new userStory title";
          const description = 'This is updated description';
          const userStoryId = 1;
          pool.query.mockResolvedValueOnce({ affectedRows: 1 });
    
          const payload = {
            title,
            description
          };
          // Call updateProduct function
          const result = await userStoryService.updateUserStory(payload, userStoryId);
    
          const query = "UPDATE user_story SET " + Object.keys(payload).map(key => `${key} = ?`).join(',')+ " WHERE userStoryId = ?";
          const params = [...Object.values(payload), userStoryId];

          // Expectations
          expect(pool.query).toHaveBeenCalledWith(query,params);
          expect(result).toEqual({ affectedRows: 1 });
        });
        it('should throw an error when database query fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            pool.query.mockRejectedValueOnce(new Error(errorMessage));
      
            // Call updateProduct function
            const title = "this is new userStory title";
            const description = 'This is updated description';
            const userStoryId = 1;
      
            const payload = {
                title,
                description
            };

            // Expectations
            await expect(userStoryService.updateUserStory(payload, [title, description, userStoryId])).rejects.toThrow(`Failed to update user story: ${errorMessage}`);
        });
    }); 

    
    describe('Get userStory By sprintId', () => {
      it('should return userStory by sprintId', async () => {
        // Mock query result
        const mockData = [userStoryData];
        pool.query.mockResolvedValueOnce([mockData]);
  
        const sprintId = 1;
        const result = await userStoryService.getUserStoriesBySprintId(sprintId);
  
        expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.userStory.getUserStoriesBySprintId, [sprintId]);
        expect(result).toEqual(mockData);
      });

  
      it('should throw an error when database query fails', async () => {
        // Mock query error
        const errorMessage = 'Database error';
        pool.query.mockRejectedValueOnce(new Error(errorMessage));
  
        const sprintId = 1;
        await expect(userStoryService.getUserStoriesBySprintId(sprintId)).rejects.toThrow(`Failed to get user stories by sprintId: ${errorMessage}`);
      });
    });

    describe('Get userStory By productId', () => {
        it('should return userStory by productId', async () => {
          // Mock query result
          const mockData = [userStoryData];
          pool.query.mockResolvedValueOnce([mockData]);
    
          const productId = 1;
          const result = await userStoryService.getUserStoriesByProductId(productId);
    
          expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.userStory.getUserStoriesByProductId, [productId]);
          expect(result).toEqual(mockData);
        });
  
    
        it('should throw an error when database query fails', async () => {
          // Mock query error
          const errorMessage = 'Database error';
          pool.query.mockRejectedValueOnce(new Error(errorMessage));
    
          const productId = 1;
          await expect(userStoryService.getUserStoriesByProductId(productId)).rejects.toThrow(`Failed to get user stories by productId: ${errorMessage}`);
        });
    });

    describe('Get userStory By epicId', () => {
        it('should return userStory by epicId', async () => {
          // Mock query result
          const mockData = [userStoryData];
          pool.query.mockResolvedValueOnce([mockData]);
    
          const epicId = 1;
          const result = await userStoryService.getUserStoriesByEpicId(epicId);
    
          expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.userStory.getUserStoriesByEpicId, [epicId]);
          expect(result).toEqual(mockData);
        });
  
    
        it('should throw an error when database query fails', async () => {
          // Mock query error
          const errorMessage = 'Database error';
          pool.query.mockRejectedValueOnce(new Error(errorMessage));
    
          const epicId = 1;
          await expect(userStoryService.getUserStoriesByEpicId(epicId)).rejects.toThrow(`Failed to get user stories by epicId: ${errorMessage}`);
        });
    });

    describe('Get deatailed userStory By sprintId', () => {
        it('should return detailed userStory by sprintId', async () => {
          // Mock query result
          const mockData = [userStoryData];
          pool.query.mockResolvedValueOnce([mockData]);
    
          const sprintId = 1;
          const result = await userStoryService.getDetailedUserStoriesBySprintId(sprintId);
    
          expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.userStory.getDetailedUserStoriesBySprintId, [sprintId]);
          expect(result).toEqual(mockData);
        });
  
    
        it('should throw an error when database query fails', async () => {
          // Mock query error
          const errorMessage = 'Database error';
          pool.query.mockRejectedValueOnce(new Error(errorMessage));
    
          const sprintId = 1;
          await expect(userStoryService.getDetailedUserStoriesBySprintId(sprintId)).rejects.toThrow(`Failed to get detailed user stories by sprintId: ${errorMessage}`);
        });
    });

    describe('Get deatailed userStory By productId', () => {
        it('should return detailed userStory by productId', async () => {
          // Mock query result
          const mockData = [userStoryData];
          pool.query.mockResolvedValueOnce([mockData]);
    
          const productId = 1;
          const result = await userStoryService.getDetailedUserStoriesByProductId(productId);
    
          expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.userStory.getDetailedUserStoriesByProductId, [productId]);
          expect(result).toEqual(mockData);
        });
  
    
        it('should throw an error when database query fails', async () => {
          // Mock query error
          const errorMessage = 'Database error';
          pool.query.mockRejectedValueOnce(new Error(errorMessage));
    
          const productId = 1;
          await expect(userStoryService.getDetailedUserStoriesByProductId(productId)).rejects.toThrow(`Failed to get detailed user stories by productId: ${errorMessage}`);
        });
    });

    describe('Get deatailed userStory By epicId', () => {
        it('should return detailed userStory by epicId', async () => {
          // Mock query result
          const mockData = [userStoryData];
          pool.query.mockResolvedValueOnce([mockData]);
    
          const epicId = 1;
          const result = await userStoryService.getDetailedUserStoriesByEpicId(epicId);
    
          expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.userStory.getDetailedUserStoriesByEpicId, [epicId]);
          expect(result).toEqual(mockData);
        });
  
    
        it('should throw an error when database query fails', async () => {
          // Mock query error
          const errorMessage = 'Database error';
          pool.query.mockRejectedValueOnce(new Error(errorMessage));
    
          const epicId = 1;
          await expect(userStoryService.getDetailedUserStoriesByEpicId(epicId)).rejects.toThrow(`Failed to get detailed user stories by epicId: ${errorMessage}`);
        });
    });

});
