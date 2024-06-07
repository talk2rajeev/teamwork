import {createUserStoryController,
    createBugController,
    updateUserStoryController,
    getUserStoriesBySprintIdController,
    getUserStoriesByProductIdController,
    getUserStoriesByEpicIdController,
    getDetailedUserStoriesBySprintIdController,
    getDetailedUserStoriesByProductId,
    getDetailedUserStoriesByEpicId
} from '../userStory.controller.js';
import * as userStoryService from '../../../services/userStoryService/userStory.service.js';

import  * as formatter from '../../../utils/formatter.js';


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

// jest.mock('../../../services/teamService/team.service.js', () => ({
//     getTeamWithUsersById: jest.fn(),
// }));

// jest.mock('../../../utils/formatter.js', () => ({
//     getFormattedproduct: jest.fn(),
//     getFormattedproductWithTeamUsers: jest.fn(),
// }));

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
                "productName": "Bazaar voice"
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

        it('should throw an error when create team fails', async () => {
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

    // describe('Get all products Product ', () => {
    //     it('should get All the Products ', async () => {
    //         const mock = [{
    //             "productId": 1,
    //             "productName": "Next Gen Product",
    //             "createdAt": "2024-04-21T09:22:16.000Z",
    //             "createdById": 2,
    //             "teamId": 2
    //         }];

    //         // Mock the roleService function to return mockValue
    //         productService.getProducts.mockResolvedValueOnce(mock);
            
    //         const req = { body: {} };
    //         const res = {
    //           status: jest.fn().mockReturnThis(),
    //           json: jest.fn()
    //         };

    //         // Call the controller function
    //         await getAllProductsController(req, res);

    //         // Expectations
    //         expect(res.status).toHaveBeenCalledWith(200);
    //         expect(res.json).toHaveBeenCalledWith(mock);
    //     });

    //     it('should handle error and return status 500', async () => {
    //         // Mock the roleService.getRoles function to throw an error
    //         productService.getProducts.mockRejectedValue(new Error('Database error'));
        
    //         // Mock the res object for the controller
    //         const res = {
    //           status: jest.fn().mockReturnThis(),
    //           json: jest.fn(),
    //         };
        
    //         // Call the getRolesController function
    //         await getAllProductsController(null, res);
        
    //         // Check if roleService.getRoles was called
    //         expect(productService.getProducts).toHaveBeenCalled();
        
    //         // Check if the response status and error message are correct
    //         expect(res.status).toHaveBeenCalledWith(500);
    //         expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    //     });

    // });

    // describe('getAllProductsWithTeam Controller', () => {
    //     it('should fetch all products with their team detail', async () => {
    //         // Sample roles data from the database
    //         const productFromDB = [
    //             {
    //                 "productId": 1,
    //                 "productName": "Next Gen Product",
    //                 "createdAt": "2024-04-21T09:22:16.000Z",
    //                 "createdById": 2,
    //                 "teamId": 2
    //             },
    //         ];
      
    //         // Expected formatted roles list
    //         const expectedFormattedProducts = [
    //             {
    //                 "productId": 1,
    //                 "productName": "Next Gen Product",
    //                 "createdBy": {
    //                     "profileId": 2,
    //                     "fname": "Amit",
    //                     "lname": "Kumar"
    //                 },
    //                 "team": {
    //                     "teamId": 2,
    //                     "teamName": "OPDS"
    //                 }
    //             },
    //         ];
          
    //         // Mock the return value of roleService.getRoles
    //         productService.getProductsWithTeam.mockResolvedValue(productFromDB);

    //         // Mock the res object for the controller
    //         const res = {
    //             status: jest.fn().mockReturnThis(),
    //             json: jest.fn(),
    //         };

    //         formatter.getFormattedproduct.mockReturnValue(expectedFormattedProducts);

    //         // Call the getRolesController function
    //         await getAllProductsWithTeamController(null, res);

    //         // Check if roleService.getRoles was called
    //         expect(productService.getProductsWithTeam).toHaveBeenCalled();

    //         // Check if formatRolesList was called with the correct argument
    //         expect(formatter.getFormattedproduct).toHaveBeenCalledWith(productFromDB);

    //         // Check if the response status and formatted roles list are correct
    //         expect(res.status).toHaveBeenCalledWith(200);
    //         expect(res.json).toHaveBeenCalledWith(expectedFormattedProducts);
    //     });
      
    //     it('should handle error and return status 500', async () => {
    //       // Mock the roleService.getRoles function to throw an error
    //       productService.getProductsWithTeam.mockRejectedValue(new Error('Database error'));
      
    //       // Mock the res object for the controller
    //       const res = {
    //         status: jest.fn().mockReturnThis(),
    //         json: jest.fn(),
    //       };
      
    //       // Call the getRolesController function
    //       await getAllProductsWithTeamController(null, res);
      
    //       // Check if roleService.getRoles was called
    //       expect(productService.getProductsWithTeam).toHaveBeenCalled();
      
    //       // Check if the response status and error message are correct
    //       expect(res.status).toHaveBeenCalledWith(500);
    //       expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    //     });
    // });

    // describe('GET /product/:id', () => {
    //     it('should get product with team and users by productId', async () => {
    //         const mockProductFromDB = [{
    //             "productId": 1,
    //             "productName": "Test product",
    //             "profileId": 2,
    //             "fname": "John",
    //             "lname": "Doe",
    //             "teamId": 2,
    //             "teamName": "Test team",
    //         }];

    //         const mockTeamUserFromDB = [{
    //             "profileId": 1,
    //             "fname": "John",
    //             "lname": "Doe",
    //             "teamId": 2,
    //             "teamName": "Test team",
    //         }];
            
    //         // Mock the userService function to return mockValue
    //         productService.getProductById.mockResolvedValueOnce(mockProductFromDB);

    //         teamService.getTeamWithUsersById.mockResolvedValueOnce(mockTeamUserFromDB);
            
            
    //         const req = { params: {id: 1} };
    //         const res = {
    //           status: jest.fn().mockReturnThis(),
    //           json: jest.fn()
    //         };


    //         // Call the controller function
    //         await getProductByIdController(req, res);

    //         expect(productService.getProductById).toHaveBeenCalled();

    //         const formattedProduct = formatter.getFormattedproduct(mockProductFromDB);
    //         // Check if formatRolesList was called with the correct argument
    //         expect(formatter.getFormattedproduct).toHaveBeenCalledWith(mockProductFromDB);


    //         expect(formatter.getFormattedproductWithTeamUsers).toHaveBeenCalledWith(formattedProduct, mockTeamUserFromDB);

    //         const productWithTeamUsers = formatter.getFormattedproductWithTeamUsers(formattedProduct, mockTeamUserFromDB)

    //         // Expectations
    //         expect(res.status).toHaveBeenCalledWith(200);
    //         expect(res.json).toHaveBeenCalledWith(productWithTeamUsers);
    //     });


    //     it('should handle error and return status 500', async () => {
    //         // Mock the roleService.getRoles function to throw an error
    //         productService.getProductById.mockRejectedValue(new Error('Database error'));
        
    //         // Mock the res object for the controller
    //         const req = { params: {id: 2} };
    //         const res = {
    //           status: jest.fn().mockReturnThis(),
    //           json: jest.fn(),
    //         };
        
    //         // Call the getRolesController function
    //         await getProductByIdController(req, res);
        
    //         // Check if roleService.getRoles was called
    //         expect(productService.getProductById).toHaveBeenCalled();
        
    //         // Check if the response status and error message are correct
    //         expect(res.status).toHaveBeenCalledWith(500);
    //         expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    //     });

    //     it('should throw an error when fetching prod by id fails', async () => {
    //         // Mock query error
    //         const errorMessage = 'Database error';
    //         productService.getProductById.mockRejectedValueOnce(new Error(errorMessage));
      
    //         const req = { params: {id: 1} };
    //         const res = {
    //           status: jest.fn().mockReturnThis(),
    //           json: jest.fn()
    //         };

    //         await getProductByIdController(req, res);

    //         expect(res.status).toHaveBeenCalledWith(500);
    //         expect(productService.getProductById).toHaveBeenCalled();
    //         expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    //     });
    // });
    
});        