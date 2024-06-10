import {createUserStoryController,
    createBugController,
    updateUserStoryController,
    getUserStoriesBySprintIdController,
    getUserStoriesByProductIdController,
    getUserStoriesByEpicIdController,
    getDetailedUserStoriesBySprintIdController,
    getDetailedUserStoriesByProductIdController,
    getDetailedUserStoriesByEpicIdController,
} from '../userStory.controller.js';
import * as userStoryService from '../../../services/userStoryService/userStory.service.js';



jest.mock('../../../services/userStoryService/userStory.service.js', () => ({
    createUserStory: jest.fn(),
    createBug: jest.fn(),
    updateUserStory: jest.fn(),
    getUserStoriesBySprintId: jest.fn(),
    getUserStoriesByProductId: jest.fn(),
    getUserStoriesByEpicId: jest.fn(),
    getDetailedUserStoriesBySprintId: jest.fn(),
    getDetailedUserStoriesByProductId: jest.fn(),
    getDetailedUserStoriesByEpicId: jest.fn(),
}));

const reqPayload = {
    "title": "Title of the user story",
    "description": "<p>This is the description of login module</p>",
    "statusId": 1,
    "assignedToUserId": 1,
    "reporterUserId": 2,
    "userStoryPoint": 5,
    "productId": 1,
    "epicId": 1,
    "sprintId": 1
};

describe('UserStory', () => {
    
    describe('Create UserStory', () => {
        it('should create a userStory', async () => {
            const mock = {
                "createdById": 1,
            };
            
            // Mock the roleService function to return mockValue
            userStoryService.createUserStory.mockResolvedValueOnce(mock);
            
            const req = { body: { ...reqPayload } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await createUserStoryController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should throw an error when create userStory fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            userStoryService.createUserStory.mockRejectedValueOnce(new Error(errorMessage));
      
            const req = { body: { ...reqPayload } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            await createUserStoryController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(userStoryService.createUserStory).toHaveBeenCalledWith(reqPayload);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });

        it('should throw error status 400 when required data is not in req payload', async () => {

            const mock = {
                error: "Bad request, please check your request payload",
            };
            
            // Mock the roleService function to return mockValue
            userStoryService.createUserStory.mockResolvedValueOnce(mock);

            const req = { body: {} };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };
            await createUserStoryController(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

    });

    describe('Create Bug', () => {
        it('should create Bug', async () => {
            const mock = {
                "createdById": 1,
            };
            
            // Mock the roleService function to return mockValue
            userStoryService.createBug.mockResolvedValueOnce(mock);
            
            const req = { body: { ...reqPayload, userStoryType: 'bug', priority: 'p4' } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await createBugController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should throw an error when create bug fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            userStoryService.createBug.mockRejectedValueOnce(new Error(errorMessage));
      
            const req = { body: { ...reqPayload, userStoryType: 'bug', priority: 'p4' } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            await createBugController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(userStoryService.createBug).toHaveBeenCalledWith({ ...reqPayload, userStoryType: 'bug', priority: 'p4' });
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });

        it('should throw error status 400 when required data is not in req payload', async () => {

            const mock = {
                error: "Bad request, please check your request payload",
            };
            
            // Mock the roleService function to return mockValue
            userStoryService.createBug.mockResolvedValueOnce(mock);

            const req = { body: {} };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };
            await createBugController(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

    });

    describe('Update userStory ', () => {
        const reqPayload = {
            "title": "updated title",
            "description": "<p>updated description</p>",
            "priority": "p2",
            "epicId": 2
        };
        it('should update userStory ', async () => {
            
            
            const req = {
                params: { id: 1 }, // Sample role ID
                body: {...reqPayload},
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // Mock the roleService function to return mockValue
            userStoryService.updateUserStory.mockResolvedValueOnce(true);

            // Call the controller function
            await updateUserStoryController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200); 
        });
        it('should handle internal server error', async () => {
            const req = {
              params: { id: 1 }, // Sample role ID
              body: { ...reqPayload }, // New role name to update
            };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
        
            // Mock the roleService.updateRole function to throw an error
            userStoryService.updateUserStory.mockRejectedValue(new Error('Database error'));
        
            // Call the updateRoleController function with the mock request and response objects
            await updateUserStoryController(req, res);
        
            // Check if the response status and error message are correct
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });

    });    

    describe('getUserStoriesBySprintId congtroller ', () => {
        it('should return All userStories for given sprintId ', async () => {
            const mock = [{
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
            }];

            // Mock the roleService function to return mockValue
            userStoryService.getUserStoriesBySprintId.mockResolvedValueOnce(mock);
            const sprintId = 1;
            const req = { body: {}, params: {id: sprintId}  };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getUserStoriesBySprintIdController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should handle error and return status 500', async () => {
            // Mock the roleService.getRoles function to throw an error
            userStoryService.getUserStoriesBySprintId.mockRejectedValue(new Error('Database error'));
        
            const sprintId = 1;
            const req = { body: {}, params: {id: sprintId}  };
            // Mock the res object for the controller
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
        
            // Call the getRolesController function
            await getUserStoriesBySprintIdController(req, res);
        
            // Check if roleService.getRoles was called
            expect(userStoryService.getUserStoriesBySprintId).toHaveBeenCalled();
        
            // Check if the response status and error message are correct
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });

    });

    describe('getUserStoriesByProductId congtroller ', () => {
        it('should return All userStories for given productId ', async () => {
            const mock = [{
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
            }];

            // Mock the roleService function to return mockValue
            userStoryService.getUserStoriesByProductId.mockResolvedValueOnce(mock);
            const productId = 1;
            const req = { body: {}, params: {id: productId}  };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getUserStoriesByProductIdController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should handle error and return status 500', async () => {
            // Mock the roleService.getRoles function to throw an error
            userStoryService.getUserStoriesByProductId.mockRejectedValue(new Error('Database error'));
        
            const productId = 1;
            const req = { body: {}, params: {id: productId}  };
            // Mock the res object for the controller
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
        
            // Call the getRolesController function
            await getUserStoriesByProductIdController(req, res);
        
            // Check if roleService.getRoles was called
            expect(userStoryService.getUserStoriesByProductId).toHaveBeenCalled();
        
            // Check if the response status and error message are correct
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });

    });

    describe('getUserStoriesByEpicId congtroller ', () => {
        it('should return All userStories for given epicId ', async () => {
            const mock = [{
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
            }];

            // Mock the roleService function to return mockValue
            userStoryService.getUserStoriesByEpicId.mockResolvedValueOnce(mock);
            const epicId = 1;
            const req = { body: {}, params: {id: epicId}  };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getUserStoriesByEpicIdController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should handle error and return status 500', async () => {
            // Mock the roleService.getRoles function to throw an error
            userStoryService.getUserStoriesByEpicId.mockRejectedValue(new Error('Database error'));
        
            const epicId = 1;
            const req = { body: {}, params: {id: epicId}  };
            // Mock the res object for the controller
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
        
            // Call the getRolesController function
            await getUserStoriesByEpicIdController(req, res);
        
            // Check if roleService.getRoles was called
            expect(userStoryService.getUserStoriesByEpicId).toHaveBeenCalled();
        
            // Check if the response status and error message are correct
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });

    });

    describe('getDetailedUserStoriesBySprintId congtroller ', () => {
        it('should return detailed userStories for given sprintId ', async () => {
            const mock = [{
                "title": "create user login module",
                "description": "<p>Create a user login module. It should contain username and password filed. </p><p>Password field should not be less than 8 characters and not more than 16 characters. </p><p>password filed should be combination of:  </p><ol><li>alphabet</li><li>number</li><li>special character</li></ol><p>refer this <a href='https://www.w3schools.com/tags/att_input_type_password.asp' rel='noopener noreferrer' target='_blank'>doc</a> for more detail. </p><p><img src='https://static.lukew.com/hidepass1.png' alt=''> </p>",
                "userStoryPoint": 5,
                "createdAt": "2024-05-27T14:08:02.000Z",
                "userStoryType": "userStory",
                "priority": null,
                "assignedToFname": "Rajeev",
                "assignedToLname": "sharma",
                "assignedtoId": 1,
                "status": "New",
                "statusId": 1,
                "productName": "Next Gen Product",
                "productId": 1,
                "epicName": "Customer Feedback",
                "epicId": 1,
                "sprintName": "May2024_2nd_sprint_UI_team",
                "sprintId": 1,
                "reportedByFname": "Amit",
                "reportedByLname": "Kumar",
                "sotryReporterid": 2
            }];

            // Mock the roleService function to return mockValue
            userStoryService.getDetailedUserStoriesBySprintId.mockResolvedValueOnce(mock);
            const sprintId = 1;
            const req = { body: {}, params: {id: sprintId}  };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getDetailedUserStoriesBySprintIdController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should handle error and return status 500', async () => {
            // Mock the roleService.getRoles function to throw an error
            userStoryService.getDetailedUserStoriesBySprintId.mockRejectedValue(new Error('Database error'));
        
            const sprintId = 1;
            const req = { body: {}, params: {id: sprintId}  };
            // Mock the res object for the controller
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
        
            // Call the getRolesController function
            await getDetailedUserStoriesBySprintIdController(req, res);
        
            // Check if roleService.getRoles was called
            expect(userStoryService.getDetailedUserStoriesBySprintId).toHaveBeenCalled();
        
            // Check if the response status and error message are correct
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });

    });

    describe('getDetailedUserStoriesByProductId congtroller ', () => {
        it('should return detailed userStories for given productId ', async () => {
            const mock = [{
                "title": "create user login module",
                "description": "<p>Create a user login module. It should contain username and password filed. </p><p>Password field should not be less than 8 characters and not more than 16 characters. </p><p>password filed should be combination of:  </p><ol><li>alphabet</li><li>number</li><li>special character</li></ol><p>refer this <a href='https://www.w3schools.com/tags/att_input_type_password.asp' rel='noopener noreferrer' target='_blank'>doc</a> for more detail. </p><p><img src='https://static.lukew.com/hidepass1.png' alt=''> </p>",
                "userStoryPoint": 5,
                "createdAt": "2024-05-27T14:08:02.000Z",
                "userStoryType": "userStory",
                "priority": null,
                "assignedToFname": "Rajeev",
                "assignedToLname": "sharma",
                "assignedtoId": 1,
                "status": "New",
                "statusId": 1,
                "productName": "Next Gen Product",
                "productId": 1,
                "epicName": "Customer Feedback",
                "epicId": 1,
                "sprintName": "May2024_2nd_sprint_UI_team",
                "sprintId": 1,
                "reportedByFname": "Amit",
                "reportedByLname": "Kumar",
                "sotryReporterid": 2
            }];

            // Mock the roleService function to return mockValue
            userStoryService.getDetailedUserStoriesByProductId.mockResolvedValueOnce(mock);
            const productId = 1;
            const req = { body: {}, params: {id: productId}  };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getDetailedUserStoriesByProductIdController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should handle error and return status 500', async () => {
            // Mock the roleService.getRoles function to throw an error
            userStoryService.getDetailedUserStoriesByProductId.mockRejectedValue(new Error('Database error'));
        
            const sprintId = 1;
            const req = { body: {}, params: {id: sprintId}  };
            // Mock the res object for the controller
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
        
            // Call the getRolesController function
            await getDetailedUserStoriesByProductIdController(req, res);
        
            // Check if roleService.getRoles was called
            expect(userStoryService.getDetailedUserStoriesByProductId).toHaveBeenCalled();
        
            // Check if the response status and error message are correct
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });

    });

    describe('getDetailedUserStoriesByEpicId congtroller ', () => {
        it('should return detailed userStories for given epicId ', async () => {
            const mock = [{
                "title": "create user login module",
                "description": "<p>Create a user login module. It should contain username and password filed. </p><p>Password field should not be less than 8 characters and not more than 16 characters. </p><p>password filed should be combination of:  </p><ol><li>alphabet</li><li>number</li><li>special character</li></ol><p>refer this <a href='https://www.w3schools.com/tags/att_input_type_password.asp' rel='noopener noreferrer' target='_blank'>doc</a> for more detail. </p><p><img src='https://static.lukew.com/hidepass1.png' alt=''> </p>",
                "userStoryPoint": 5,
                "createdAt": "2024-05-27T14:08:02.000Z",
                "userStoryType": "userStory",
                "priority": null,
                "assignedToFname": "Rajeev",
                "assignedToLname": "sharma",
                "assignedtoId": 1,
                "status": "New",
                "statusId": 1,
                "productName": "Next Gen Product",
                "productId": 1,
                "epicName": "Customer Feedback",
                "epicId": 1,
                "sprintName": "May2024_2nd_sprint_UI_team",
                "sprintId": 1,
                "reportedByFname": "Amit",
                "reportedByLname": "Kumar",
                "sotryReporterid": 2
            }];

            // Mock the roleService function to return mockValue
            userStoryService.getDetailedUserStoriesByEpicId.mockResolvedValueOnce(mock);
            const epicId = 1;
            const req = { body: {}, params: {id: epicId}  };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getDetailedUserStoriesByEpicIdController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should handle error and return status 500', async () => {
            // Mock the roleService.getRoles function to throw an error
            userStoryService.getDetailedUserStoriesByEpicId.mockRejectedValue(new Error('Database error'));
        
            const sprintId = 1;
            const req = { body: {}, params: {id: sprintId}  };
            // Mock the res object for the controller
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
        
            // Call the getRolesController function
            await getDetailedUserStoriesByEpicIdController(req, res);
        
            // Check if roleService.getRoles was called
            expect(userStoryService.getDetailedUserStoriesByEpicId).toHaveBeenCalled();
        
            // Check if the response status and error message are correct
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });

    });
    
});        