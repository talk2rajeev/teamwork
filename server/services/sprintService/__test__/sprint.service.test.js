import {pool} from '../../../config/dbConfig/database.js';
import * as sprintService from '../sprint.service.js';
import {SQL_QUERIES} from '../../../utils/queries.js';


// Mock environment values
jest.mock('../../../config/dbConfig/database.js', () => ({
    pool: {
        query: jest.fn()
      }
}));
  
describe('Sprint Service', () => {
    
    describe('Create Sprint', () => { 
        const sprintName= "01.01.2024_1a", createdById= 2, productId= 1, startDate= "2024-05-16T12:38:47.015Z", endDate= "2024-05-31T12:38:47.015Z";
        const payload = {sprintName, createdById, productId, startDate, endDate};
        it('should create sprint', async () => {
            // Mock query result
            const mockSprintData = [{
                ...payload,
            }];
            pool.query.mockResolvedValueOnce([mockSprintData]);

            const res = await sprintService.createSprint(payload);

            expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.sprint.createSprintQuery, [sprintName, createdById, productId, startDate, endDate]);
        });
        it('should throw an error when database query fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            pool.query.mockRejectedValueOnce(new Error(errorMessage));
      
            // Expectations
            await expect(sprintService.createSprint(payload)).rejects.toThrow(`Failed to create sprint: ${errorMessage}`);
          });
    });

    describe('Get All Sprints', () => {
        it('should return sprint list', async () => {
          // Mock query result
          const mockSprintData = [{
            "sprintId": 1,
            "sprintName": "May2024_2nd_sprint_UI_team",
            "createdById": 2,
            "productId": 1,
            "createdAt": "2024-05-24T13:05:06.000Z",
            "startDate": "2024-05-16T12:38:47.015Z",
            "endDate": "2024-05-31T12:38:47.015Z"
          }];
          pool.query.mockResolvedValueOnce([mockSprintData]);
    
          const sprintData = await sprintService.getAllSprints();
    
          expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.sprint.getAllSprintQuery);
          expect(sprintData).toEqual(mockSprintData);
        });
  
    
        it('should throw an error when database query fails', async () => {
          // Mock query error
          const errorMessage = 'Database error';
          pool.query.mockRejectedValueOnce(new Error(errorMessage));
    
          expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.sprint.getAllSprintQuery);
          await expect(sprintService.getAllSprints()).rejects.toThrow(`Failed to get all sprints: ${errorMessage}`);
        });
    });

    describe('update sprint', () => {
        it('should update an existing sprint', async () => {
          // Mock query result
          const sprintId = 1;
          const sprintName = 'Updated sprint name';
          pool.query.mockResolvedValueOnce({ affectedRows: 1 });
    
          // Call updateProduct function
          const result = await sprintService.updateSprint({sprintName}, sprintId);
    
          // Expectations
          expect(pool.query).toHaveBeenCalledWith(
            'UPDATE sprint SET sprintName = ? WHERE sprintId = ?',
            [sprintName, sprintId]
          );
          expect(result).toEqual({ affectedRows: 1 });
        });
        it('should throw an error when database query fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            pool.query.mockRejectedValueOnce(new Error(errorMessage));
      
            // Call updateProduct function
            const sprintId = 1;
            const sprintName = 'Updated sprint name';
      
            // Expectations
            await expect(sprintService.updateSprint({sprintName}, sprintId)).rejects.toThrow(`Failed to update sprint: ${errorMessage}`);
        });
    }); 

    describe('Get Sprint By Id', () => {
      it('should return sprint by ID', async () => {
        // Mock query result
        const mockSprintData = [{
            "sprintId": 1,
            "sprintName": "May2024_2nd_sprint_UI_team",
            "createdById": 2,
            "productId": 1,
            "createdAt": "2024-05-24T13:05:06.000Z",
            "startDate": "2024-05-16T12:38:47.015Z",
            "endDate": "2024-05-31T12:38:47.015Z"
        }];
        pool.query.mockResolvedValueOnce([mockSprintData]);
  
        const sprintId = 1;
        const sprintData = await sprintService.getSprintById(sprintId);
  
        expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.sprint.getSprintByIdQuery, [sprintId]);
        expect(sprintData).toEqual(mockSprintData);
      });

  
      it('should throw an error when database query fails', async () => {
        // Mock query error
        const errorMessage = 'Database error';
        pool.query.mockRejectedValueOnce(new Error(errorMessage));
  
        const sprintId = 1;
        await expect(sprintService.getSprintById(sprintId)).rejects.toThrow(`Failed to get sprint by id: ${errorMessage}`);
      });
    });

    

    describe('Get Sprint By product Id', () => {
        it('should return product by ID', async () => {
          // Mock query result
          const mockSprintData = [{
            "sprintId": 1,
            "sprintName": "May2024_2nd_sprint_UI_team",
            "createdAt": "2024-05-24T13:05:06.000Z",
            "startDate": "2024-05-16T12:38:47.015Z",
            "endDate": "2024-05-31T12:38:47.015Z",
            "fname": "Amit",
            "lname": "Kumar",
            "profileId": 2,
            "productName": "Next Gen Product",
            "productId": 1
        }];
          pool.query.mockResolvedValueOnce([mockSprintData]);
    
          const productId = 1;
          const sprintData = await sprintService.getSprintByProductId(productId);
    
          expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.sprint.getSprintByProductIdQuery, [productId]);
          expect(sprintData).toEqual(mockSprintData);
        });
  
    
        it('should throw an error when database query fails', async () => {
          // Mock query error
          const errorMessage = 'Database error';
          pool.query.mockRejectedValueOnce(new Error(errorMessage));
    
          const productId = 1;
          await expect(sprintService.getSprintByProductId(productId)).rejects.toThrow(`Failed to get sprint by productId: ${errorMessage}`);
        });
    });   

});
