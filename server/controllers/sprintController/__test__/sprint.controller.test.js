import {
    createSprintController,
    getAllSprintsController,
    updateSprintController,
    getSprintByIdController,
    getSprintByProductIdController,
} from '../sprint.controller.js';
import * as sprintService from '../../../services/sprintService/sprint.service.js';

jest.mock('../../../services/sprintService/sprint.service.js', () => ({
    createSprint: jest.fn(),
    getAllSprints: jest.fn(),
    updateSprint: jest.fn(),
    getSprintById: jest.fn(),
    getSprintByProductId: jest.fn(),
}));


describe('Sprint Controller', () => {
    
    describe('create sprint', () => {
        const payload = {
            "sprintName": "01.01.2024_1a",
            "createdById": 2,
            "productId": 1,
            "startDate": "2024-05-16T12:38:47.015Z",
            "endDate": "2024-05-31T12:38:47.015Z"
        };
        it('should create a sprint', async () => {
            const mock = {
                "sprintName": "01.01.2024_1a",
                "createdById": 2,
            };
            
            sprintService.createSprint.mockResolvedValueOnce(mock);
            
            const req = { body: { ...payload } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await createSprintController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should throw an error when create team fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            sprintService.createSprint.mockRejectedValueOnce(new Error(errorMessage));
      
            const req = { body: { ...payload } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            await createSprintController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(sprintService.createSprint).toHaveBeenCalledWith(payload);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('GET All Sprints', () => {
        it('should return all sprints', async () => {
            const mock = [{
                "sprintId": 1,
                "sprintName": "May2024_2nd_sprint_UI_team",
                "createdById": 2,
                "productId": 1,
                "createdAt": "2024-05-24T13:05:06.000Z",
                "startDate": "2024-05-16T12:38:47.015Z",
                "endDate": "2024-05-31T12:38:47.015Z"
            }];
            
            
            // Mock the userService function to return mockValue
            sprintService.getAllSprints.mockResolvedValueOnce(mock);

            const req = {};
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getAllSprintsController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should handle error and return status 500', async () => {
            // Mock the roleService.getRoles function to throw an error
            sprintService.getAllSprints.mockRejectedValue(new Error('Database error'));
        
            // Mock the res object for the controller
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
        
            // Call the getRolesController function
            await getAllSprintsController(null, res);
        
            // Check if roleService.getRoles was called
            expect(sprintService.getAllSprints).toHaveBeenCalled();
        
            // Check if the response status and error message are correct
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });

    });

    describe('Update sprint', () => {
        it('should update sprint data', async () => {
            
            // Mock the userService function to return mockValue
            sprintService.updateSprint.mockResolvedValueOnce(true);

            const req = { body: {"sprintName": "May2024_2nd_sprint_UI_team"}, params: {id: 1} };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await updateSprintController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(true);  
        })
        it('should throw an error when updating sprint', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            sprintService.updateSprint.mockRejectedValueOnce(new Error(errorMessage));
      
            const req = { body: { "sprintName": "May2024_2nd_sprint_UI_team" }, params: {id: 1} };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            await updateSprintController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });    

    describe('GET Sprint By Id', () => {
        it('should get sprint by sprintId', async () => {
            const mock = {
                "sprintId": 1,
                "sprintName": "May2024_2nd_sprint_UI_team",
                "createdById": 2,
                "productId": 1,
                "createdAt": "2024-05-24T13:05:06.000Z",
                "startDate": "2024-05-16T12:38:47.015Z",
                "endDate": "2024-05-31T12:38:47.015Z"
            };
            
            
            // Mock the userService function to return mockValue
            sprintService.getSprintById.mockResolvedValueOnce(mock);

            const req = { params: {id: 1} };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getSprintByIdController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should return a empty arr if sprint with the given ID is not found', async () => {
            // Mock the userService function to return undefined (user not found)
            sprintService.getSprintById.mockResolvedValueOnce([]);
      
            // Mock request and response objects
            const req = { params: { id: '999' } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };
      
            // Call the controller function
            await getSprintByIdController(req, res);
      
            // Expectations
            expect(sprintService.getSprintById).toHaveBeenCalledWith('999');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
          });
    });

    describe('GET Sprint By ProductId', () => {
        it('should get sprint by productId', async () => {
            const mock = {
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
            };
            
            
            // Mock the userService function to return mockValue
            sprintService.getSprintByProductId.mockResolvedValueOnce(mock);

            const req = { params: {id: 1} };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getSprintByProductIdController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should return a empty arr no data found for given productID', async () => {
            // Mock the userService function to return undefined (user not found)
            sprintService.getSprintByProductId.mockResolvedValueOnce([]);
      
            // Mock request and response objects
            const req = { params: { id: '999' } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };
      
            // Call the controller function
            await getSprintByProductIdController(req, res);
      
            // Expectations
            expect(sprintService.getSprintByProductId).toHaveBeenCalledWith('999');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
          });
    });
    // describe('GET /getAllTeams', () => {
    //     it('should return all teams', async () => {
    //         const mock = [{
    //             "teamId": 1,
    //             "teamName": "test team",
    //             "createdAt": "2024-02-08T15:43:39.037Z",
    //           },
    //           {
    //             "teamId": 2,
    //             "teamName": "test team 2",
    //             "createdAt": "2024-02-08T15:43:39.037Z",
    //           }];
            
            
    //         // Mock the userService function to return mockValue
    //         teamService.getTeams.mockResolvedValueOnce(mock);

    //         const req = {};
    //         const res = {
    //           status: jest.fn().mockReturnThis(),
    //           json: jest.fn()
    //         };

    //         // Call the controller function
    //         await getTeamsController(req, res);

    //         // Expectations
    //         expect(res.status).toHaveBeenCalledWith(200);
    //         expect(res.json).toHaveBeenCalledWith(mock);
    //     });

    // });


   
});        