import {pool} from '../../../config/dbConfig/database.js';
import * as epicService from '../epic.service.js';
import {SQL_QUERIES} from '../../../utils/queries.js';


// Mock environment values
jest.mock('../../../config/dbConfig/database.js', () => ({
    pool: {
        query: jest.fn()
      }
  }));
  
  describe('Epic Service', () => {
    describe('Create Epic', () => { 
        const epicName = 'test Epic', epicDescription = 'some epic description', createdById = 2, productId = 1, createdAt = new Date().toISOString();
        const payload = {epicName, epicDescription, createdById, productId};
        it('should create epic', async () => {
            const mockEpicId = 1;
            pool.query.mockResolvedValueOnce({ insertId: mockEpicId });

            await epicService.createEpic(payload);

            expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.epic.createEpicQuery, [epicName, epicDescription, createdById, productId]);
        });
        it('should throw an error when database query fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            pool.query.mockRejectedValueOnce(new Error(errorMessage));
      
            
            // Expectations
            await expect(epicService.createEpic(payload)).rejects.toThrow(`Failed to create epic: ${errorMessage}`);
        });
    });

    describe('Get All Epics', () => {
        it('should return all the Epics', async () => {
          // Mock query result
          const mockEpicData = [{
            "epicId": 1,
                "epicName": "Customer Feedback",
                "epicDescription": "Customer Feedback on feature for change and enhacement",
                "createdAt": "2024-05-01T11:16:25.000Z",
                "createdById": 2,
                "productId": 1
            },
            {
                "epicId": 2,
                "epicName": "UI Enhancement",
                "epicDescription": "Enhace UI components",
                "createdAt": "2024-05-04T11:02:44.000Z",
                "createdById": 2,
                "productId": 2
          }];
          
          pool.query.mockResolvedValueOnce([mockEpicData]);
    
          const epicData = await epicService.getEpics()
    
          expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.epic.getEpics);
          expect(epicData).toEqual(mockEpicData);
        });
  
    
        it('should throw an error when database query fails', async () => {
          // Mock query error
          const errorMessage = 'Database error';
          pool.query.mockRejectedValueOnce(new Error(errorMessage));
    
          expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.epic.getEpics);
          await expect(epicService.getEpics()).rejects.toThrow(`Failed to get the epics: ${errorMessage}`);
        });
    });

    describe('Get Epic By Id', () => {
      it('should return epic data when eppic ID exists', async () => {
        // Mock query result
        const mockEpicData = [{
            "epicId": 1,
            "epicName": "Customer Feedback",
            "epicDescription": "Customer Feedback on feature for change and enhacement",
            "createdAt": "2024-05-01T11:16:25.000Z",
            "createdById": 2,
            "productId": 1
        }];
        pool.query.mockResolvedValueOnce([mockEpicData]);
  
        const epicId = 1;
        const epicData = await epicService.getEpicById(epicId);
  
        expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.epic.getEpicById, [epicId]);
        expect(epicData).toEqual(mockEpicData);
      });

  
      it('should throw an error when database query fails', async () => {
        // Mock query error
        const errorMessage = 'Database error';
        pool.query.mockRejectedValueOnce(new Error(errorMessage));
  
        const epicId = 1;
        await expect(epicService.getEpicById(epicId)).rejects.toThrow(`Failed to get epic by epicId: ${errorMessage}`);
      });
    });

    

    describe('Update Epic', () => {
        const epicId = 1;
        const epicName = 'Updated Epic';
        const epicDescription = 'description';
        const productId = 1;
        const epicData = {
            epicName, epicDescription, productId
        }
        it('should update an existing epic', async () => {
          // Mock query result
          
          pool.query.mockResolvedValueOnce({ affectedRows: 1 });
    
          // Call updateProduct function
          const result = await epicService.updateEpic(epicData, epicId);
          
          const query = "Update epic SET " + Object.keys(epicData).map(key => `${key} = ?`).join(',')+ " WHERE epicId = ?";
          const params = [...Object.values(epicData), epicId];
    
          // Expectations
          expect(pool.query).toHaveBeenCalledWith(
            query,
            params
          );
          expect(result).toEqual({ affectedRows: 1 });
        });
        it('should throw an error when database query fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            pool.query.mockRejectedValueOnce(new Error(errorMessage));
      
            // Expectations
            await expect(epicService.updateEpic(epicData, epicId)).rejects.toThrow(`Failed to update Epic: ${errorMessage}`);
        });
    });   
    
    
    describe('Get Epic By productId', () => {
        it('should return epic data for product by productId', async () => {
          // Mock query result
          const mockEpicData = [{
            "epicId": 1,
            "epicName": "Customer Feedback",
            "epicDescription": "Customer Feedback on feature for change and enhacement",
            "createdAt": "2024-05-01T11:16:25.000Z",
            "createdById": 2,
            "productId": 1
          }];
          pool.query.mockResolvedValueOnce([mockEpicData]);
    
          const productId = 1;
          const epicData = await epicService.getEpicsByProductId(productId);
    
          expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.epic.getEpicsByProductIdQuery, [productId]);
          expect(epicData).toEqual(mockEpicData);
        });
  
    
        it('should throw an error when database query fails', async () => {
          // Mock query error
          const errorMessage = 'Database error';
          pool.query.mockRejectedValueOnce(new Error(errorMessage));
    
          const productId = 1;
          await expect(epicService.getEpicsByProductId(productId)).rejects.toThrow(`Failed to get epic by productId: ${errorMessage}`);
        });
    });

  });
