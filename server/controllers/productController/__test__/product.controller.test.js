import {createProductController,
    updateProductController,
    getAllProductsController,
    getAllProductsWithTeamController,
    getProductByIdController
} from '../product.controller.js';
import * as productService from '../../../services/productService/product.service.js';
import  * as formatter from '../../../utils/formatter.js';




jest.mock('../../../services/productService/product.service.js', () => ({
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    getProducts: jest.fn(),
    getProductsWithTeam: jest.fn(),
}));

jest.mock('../../../utils/formatter.js', () => ({
    getFormattedproduct: jest.fn(),
    getFormattedproductWithTeamUsers: jest.fn(),
}));


describe('Product Controller', () => {
    
    describe('Create Product', () => {
        it('should create a product', async () => {
            const mock = {
                "createdById": 1,
                "productName": "Bazaar voice"
            };
            
            // Mock the roleService function to return mockValue
            productService.createProduct.mockResolvedValueOnce(mock);
            
            const req = { body: { productName: "Test product", createdById: 1, teamId: 1 } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await createProductController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should throw an error when create team fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            productService.createProduct.mockRejectedValueOnce(new Error(errorMessage));
      
            const req = { body: { productName: "Test product", createdById: 1, teamId: 1 } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            await createProductController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(productService.createProduct).toHaveBeenCalledWith("Test product", 1, 1);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });

        it('should throw error when service call fails with 500', async () => {

            const mock = {
                error: "productName, creator profile id and teamId is mandatory",
            };
            
            // Mock the roleService function to return mockValue
            productService.createProduct.mockResolvedValueOnce(mock);

            const req = { body: {} };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };
            await createProductController(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

    });

    describe('Update Product ', () => {
        it('should update Product ', async () => {
            
            
            const req = {
                params: { id: 1 }, // Sample role ID
                body: { productName: "test product", productId: 1, teamId: 1 }, // New role name to update
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // Mock the roleService function to return mockValue
            productService.updateProduct.mockResolvedValueOnce(true);

            // Call the controller function
            await updateProductController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            // expect(res.json).toHaveBeenCalledWith({ message: 'Role updated successfully' });  
        });
        it('should handle internal server error', async () => {
            const req = {
              params: { id: 1 }, // Sample role ID
              body: { productName: "test product", productId: 1, teamId: 1 }, // New role name to update
            };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
        
            // Mock the roleService.updateRole function to throw an error
            productService.updateProduct.mockRejectedValue(new Error('Database error'));
        
            // Call the updateRoleController function with the mock request and response objects
            await updateProductController(req, res);
        
            // Check if the response status and error message are correct
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });

    });    

    describe('Get all products Product ', () => {
        it('should get All the Products ', async () => {
            const mock = [{
                "productId": 1,
                "productName": "Next Gen Product",
                "createdAt": "2024-04-21T09:22:16.000Z",
                "createdById": 2,
                "teamId": 2
            }];

            // Mock the roleService function to return mockValue
            productService.getProducts.mockResolvedValueOnce(mock);
            
            const req = { body: {} };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getAllProductsController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should handle error and return status 500', async () => {
            // Mock the roleService.getRoles function to throw an error
            productService.getProducts.mockRejectedValue(new Error('Database error'));
        
            // Mock the res object for the controller
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
        
            // Call the getRolesController function
            await getAllProductsController(null, res);
        
            // Check if roleService.getRoles was called
            expect(productService.getProducts).toHaveBeenCalled();
        
            // Check if the response status and error message are correct
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });

    });

    describe('getAllProductsWithTeam Controller', () => {
        it('should fetch all products with their team detail', async () => {
            // Sample roles data from the database
            const productFromDB = [
                {
                    "productId": 1,
                    "productName": "Next Gen Product",
                    "createdAt": "2024-04-21T09:22:16.000Z",
                    "createdById": 2,
                    "teamId": 2
                },
            ];
      
            // Expected formatted roles list
            const expectedFormattedProducts = [
                {
                    "productId": 1,
                    "productName": "Next Gen Product",
                    "createdBy": {
                        "profileId": 2,
                        "fname": "Amit",
                        "lname": "Kumar"
                    },
                    "team": {
                        "teamId": 2,
                        "teamName": "OPDS"
                    }
                },
            ];
          
            // Mock the return value of roleService.getRoles
            productService.getProductsWithTeam.mockResolvedValue(productFromDB);

            // Mock the res object for the controller
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            formatter.getFormattedproduct.mockReturnValue(expectedFormattedProducts);

            // Call the getRolesController function
            await getAllProductsWithTeamController(null, res);

            // Check if roleService.getRoles was called
            expect(productService.getProductsWithTeam).toHaveBeenCalled();

            // Check if formatRolesList was called with the correct argument
            expect(formatter.getFormattedproduct).toHaveBeenCalledWith(productFromDB);

            // Check if the response status and formatted roles list are correct
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expectedFormattedProducts);
        });
      
        it('should handle error and return status 500', async () => {
          // Mock the roleService.getRoles function to throw an error
          productService.getProductsWithTeam.mockRejectedValue(new Error('Database error'));
      
          // Mock the res object for the controller
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
      
          // Call the getRolesController function
          await getAllProductsWithTeamController(null, res);
      
          // Check if roleService.getRoles was called
          expect(productService.getProductsWithTeam).toHaveBeenCalled();
      
          // Check if the response status and error message are correct
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });
    });

    // describe('GET /role/:id', () => {
    //     it('should get role by id', async () => {
    //         const mock = {
    //             "roleId": 1,
    //             "roleName": "testuser",
    //           };
            
            
    //         // Mock the userService function to return mockValue
    //         roleService.getRoleById.mockResolvedValueOnce(mock);

    //         const req = { params: {id: 1} };
    //         const res = {
    //           status: jest.fn().mockReturnThis(),
    //           json: jest.fn()
    //         };

    //         // Call the controller function
    //         await getRoleByIdController(req, res);

    //         // Expectations
    //         expect(res.status).toHaveBeenCalledWith(200);
    //         expect(res.json).toHaveBeenCalledWith(mock);
    //     });

    //     it('should return a empty arr if user with the given ID is not found', async () => {
    //         // Mock the userService function to return undefined (user not found)
    //         roleService.getRoleById.mockResolvedValueOnce([]);
      
    //         // Mock request and response objects
    //         const req = { params: { id: '999' } };
    //         const res = {
    //           status: jest.fn().mockReturnThis(),
    //           json: jest.fn()
    //         };
      
    //         // Call the controller function
    //         await getRoleByIdController(req, res);
      
    //         // Expectations
    //         expect(roleService.getRoleById).toHaveBeenCalledWith('999');
    //         expect(res.status).toHaveBeenCalledWith(200);
    //         expect(res.json).toHaveBeenCalledWith([]);
    //       });
    // });


    // describe('Get All Roles Controller', () => {
    //     it('should fetch roles and return formatted roles list', async () => {
    //       // Sample roles data from the database
    //       const rolesFromDB = [
    //         {
    //           roleId: 1,
    //           roleName: 'Admin',
    //           profileId: 101,
    //           fname: 'John',
    //           lname: 'Doe',
    //         },
    //       ];
      
    //       // Expected formatted roles list
    //       const expectedFormattedRoles = [
    //         {
    //           roleId: 1,
    //           roleName: 'Admin',
    //           createdBy: {
    //             profileId: 101,
    //             fname: 'John',
    //             lname: 'Doe',
    //           },
    //         },
    //       ];
          
    //       // Mock the return value of roleService.getRoles
    //         roleService.getRoles.mockResolvedValue(rolesFromDB);

    //         // Mock the res object for the controller
    //         const res = {
    //         status: jest.fn().mockReturnThis(),
    //         json: jest.fn(),
    //         };

    //         roleFormatter.formatRolesList.mockReturnValue(expectedFormattedRoles);

    //         // Call the getRolesController function
    //         await getRolesController(null, res);

    //         // Check if roleService.getRoles was called
    //         expect(roleService.getRoles).toHaveBeenCalled();

    //         // Check if formatRolesList was called with the correct argument
    //         expect(roleFormatter.formatRolesList).toHaveBeenCalledWith(rolesFromDB);

    //         // Check if the response status and formatted roles list are correct
    //         expect(res.status).toHaveBeenCalledWith(200);
    //         expect(res.json).toHaveBeenCalledWith(expectedFormattedRoles);
    //     });
      
    //     it('should handle error and return status 500', async () => {
    //       // Mock the roleService.getRoles function to throw an error
    //       roleService.getRoles.mockRejectedValue(new Error('Database error'));
      
    //       // Mock the res object for the controller
    //       const res = {
    //         status: jest.fn().mockReturnThis(),
    //         json: jest.fn(),
    //       };
      
    //       // Call the getRolesController function
    //       await getRolesController(null, res);
      
    //       // Check if roleService.getRoles was called
    //       expect(roleService.getRoles).toHaveBeenCalled();
      
    //       // Check if the response status and error message are correct
    //       expect(res.status).toHaveBeenCalledWith(500);
    //       expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    //     });
    // });

    
});        