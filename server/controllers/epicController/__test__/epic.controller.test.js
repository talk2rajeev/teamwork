import { 
    createEpicController,
    getEpicsController,
    updateEpicController,
    getEpicsByIdController,
    getEpicsByProductIdController,
} from '../epic.controller.js';

import * as epicService from '../../../services/epicService/epic.service.js';



jest.mock('../../../services/epicService/epic.service.js', () => ({
    createEpic: jest.fn(),
    getEpics: jest.fn(),
    getEpicsByProductId: jest.fn(),
    updateEpic: jest.fn(),
    getEpicById: jest.fn(),
}));


describe('Epic Controller', () => {
    
    describe('Create Epic', () => {
        const paylod = { epicName: "test epic", epicDescription: 'epic desc', createdById: 2, productId: 1 };
        it('should create a Epic', async () => {
            const mock = {
                "createdById": 1,
                "epicName": "Bazaar voice"
            };
            
            // Mock the roleService function to return mockValue
            epicService.createEpic.mockResolvedValueOnce(mock);
            
            const req = { body: { ...paylod } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await createEpicController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should throw an error when create team fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            epicService.createEpic.mockRejectedValueOnce(new Error(errorMessage));

        
            const req = { body: { ...paylod } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            await createEpicController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(epicService.createEpic).toHaveBeenCalledWith(paylod);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });

    });

    describe('Update Epic ', () => {
        const req = {
            params: { id: 1 }, // Sample role ID
            body: { epicName: "Customer Feedback", epicDescription: "Test desc", productId: 1 }, 
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        it('should update Epic ', async () => {
            

            // Mock the roleService function to return mockValue
            epicService.updateEpic.mockResolvedValueOnce(true);

            // Call the controller function
            await updateEpicController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            // expect(res.json).toHaveBeenCalledWith({ message: 'Role updated successfully' });  
        });
        it('should handle internal server error', async () => {
            
        
            // Mock the roleService.updateRole function to throw an error
            epicService.updateEpic.mockRejectedValue(new Error('Database error'));
        
            // Call the updateRoleController function with the mock request and response objects
            await updateEpicController(req, res);
        
            // Check if the response status and error message are correct
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });

    });   
    
    describe('GET all the Epics', () => {
        it('should return all the epics', async () => {
            const mock = [{
                "epicId": 1,
                "epicName": "Customer Feedback",
                "epicDescription": "Customer Feedback on feature for change and enhacement.",
                "createdAt": "2024-05-01T11:16:25.000Z",
                "createdById": 2,
                "productId": 1
            }];
            
            
            // Mock the userService function to return mockValue
            epicService.getEpics.mockResolvedValueOnce(mock);

            const req = {};
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getEpicsController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should return an empty arr if no epics found', async () => {
            // Mock the userService function to return undefined (user not found)
            epicService.getEpics.mockResolvedValueOnce([]);
      
            // Mock request and response objects
            const req = {};
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };
      
            // Call the controller function
            await getEpicsController(req, res);
      
            // Expectations
            expect(epicService.getEpics).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
        });
    });

    describe('GET Epic by id', () => {
        it('should get epic by id', async () => {
            const mock = [{
                "epicId": 1,
                "epicName": "Customer Feedback",
                "epicDescription": "Customer Feedback on feature for change and enhacement.",
                "createdAt": "2024-05-01T11:16:25.000Z",
                "createdById": 2,
                "productId": 1
            }];
            
            
            // Mock the userService function to return mockValue
            epicService.getEpicById.mockResolvedValueOnce(mock);

            const req = { params: {id: 1} };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getEpicsByIdController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should return a empty arr if user with the given ID is not found', async () => {
            // Mock the userService function to return undefined (user not found)
            epicService.getEpicById.mockResolvedValueOnce([]);
      
            // Mock request and response objects
            const req = { params: { id: '999' } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };
      
            // Call the controller function
            await getEpicsByIdController(req, res);
      
            // Expectations
            expect(epicService.getEpicById).toHaveBeenCalledWith('999');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
        });
    });

    describe('GET Epic by product id', () => {
        it('should get epic by id', async () => {
            const mock = [{
                "epicId": 1,
                "epicName": "Customer Feedback",
                "epicDescription": "Customer Feedback on feature for change and enhacement.",
                "createdAt": "2024-05-01T11:16:25.000Z",
                "createdById": 2,
                "productId": 1
            }];
            
            
            // Mock the userService function to return mockValue
            epicService.getEpicsByProductId.mockResolvedValueOnce(mock);

            const req = { params: {id: 1} };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getEpicsByProductIdController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should return a empty arr if product ID is not found', async () => {
            // Mock the userService function to return undefined (user not found)
            epicService.getEpicsByProductId.mockResolvedValueOnce([]);
      
            // Mock request and response objects
            const req = { params: { id: '999' } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };
      
            // Call the controller function
            await getEpicsByProductIdController(req, res);
      
            // Expectations
            expect(epicService.getEpicsByProductId).toHaveBeenCalledWith('999');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
        });
    });

});        