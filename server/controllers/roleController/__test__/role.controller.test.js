import {createRoleController,
    updateRoleController,
    getRolesController,
    getRoleByIdController
} from '../role.controller.js';
import * as roleService from '../../../services/roleService/role.service.js';
import  * as roleFormatter from '../../../utils/formatter.js';




jest.mock('../../../services/roleService/role.service.js', () => ({
    createRole: jest.fn(),
    getRoles: jest.fn(),
    getRoleById: jest.fn(),
    updateRole: jest.fn(),
}));

jest.mock('../../../utils/formatter.js', () => ({
    formatRolesList: jest.fn(),
}));


describe('Role Controller', () => {
    
    describe('createRole', () => {
        it('should create a role', async () => {
            const mock = {
                "createdById": 1,
                "roleName": "admin"
            };
            
            // Mock the roleService function to return mockValue
            roleService.createRole.mockResolvedValueOnce(mock);
            
            const req = { body: { roleName: 'admin', createdById: 1 } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await createRoleController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should throw an error when create team fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            roleService.createRole.mockRejectedValueOnce(new Error(errorMessage));
      
            const req = { body: { roleName: 'admin', createdById: 1 } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            await createRoleController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(roleService.createRole).toHaveBeenCalledWith('admin', 1);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });

        it('should throw error when service call fails with 500', async () => {

            const mock = {
                error: "roleName and creator profile id is mandatory",
            };
            
            // Mock the roleService function to return mockValue
            roleService.createRole.mockResolvedValueOnce(mock);

            const req = { body: {} };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };
            await createRoleController(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

    });

    describe('Update role ', () => {
        it('should update role ', async () => {
            
            
            const req = {
                params: { id: 1 }, // Sample role ID
                body: { roleName: 'New Role Name' }, // New role name to update
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // Mock the roleService function to return mockValue
            roleService.updateRole.mockResolvedValueOnce(true);

            // Call the controller function
            await updateRoleController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            // expect(res.json).toHaveBeenCalledWith({ message: 'Role updated successfully' });  
        });
        it('should handle internal server error', async () => {
            const req = {
              params: { id: 1 }, // Sample role ID
              body: { roleName: 'New Role Name' }, // New role name to update
            };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
        
            // Mock the roleService.updateRole function to throw an error
            roleService.updateRole.mockRejectedValue(new Error('Database error'));
        
            // Call the updateRoleController function with the mock request and response objects
            await updateRoleController(req, res);
        
            // Check if the response status and error message are correct
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });

    });    

    describe('GET /role/:id', () => {
        it('should get role by id', async () => {
            const mock = {
                "roleId": 1,
                "roleName": "testuser",
              };
            
            
            // Mock the userService function to return mockValue
            roleService.getRoleById.mockResolvedValueOnce(mock);

            const req = { params: {id: 1} };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };

            // Call the controller function
            await getRoleByIdController(req, res);

            // Expectations
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mock);
        });

        it('should return a empty arr if user with the given ID is not found', async () => {
            // Mock the userService function to return undefined (user not found)
            roleService.getRoleById.mockResolvedValueOnce([]);
      
            // Mock request and response objects
            const req = { params: { id: '999' } };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
            };
      
            // Call the controller function
            await getRoleByIdController(req, res);
      
            // Expectations
            expect(roleService.getRoleById).toHaveBeenCalledWith('999');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
          });
    });


    describe('Get All Roles Controller', () => {
        it('should fetch roles and return formatted roles list', async () => {
          // Sample roles data from the database
          const rolesFromDB = [
            {
              roleId: 1,
              roleName: 'Admin',
              profileId: 101,
              fname: 'John',
              lname: 'Doe',
            },
          ];
      
          // Expected formatted roles list
          const expectedFormattedRoles = [
            {
              roleId: 1,
              roleName: 'Admin',
              createdBy: {
                profileId: 101,
                fname: 'John',
                lname: 'Doe',
              },
            },
          ];
          
          // Mock the return value of roleService.getRoles
            roleService.getRoles.mockResolvedValue(rolesFromDB);

            // Mock the res object for the controller
            const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            };

            roleFormatter.formatRolesList.mockReturnValue(expectedFormattedRoles);

            // Call the getRolesController function
            await getRolesController(null, res);

            // Check if roleService.getRoles was called
            expect(roleService.getRoles).toHaveBeenCalled();

            // Check if formatRolesList was called with the correct argument
            expect(roleFormatter.formatRolesList).toHaveBeenCalledWith(rolesFromDB);

            // Check if the response status and formatted roles list are correct
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expectedFormattedRoles);
        });
      
        it('should handle error and return status 500', async () => {
          // Mock the roleService.getRoles function to throw an error
          roleService.getRoles.mockRejectedValue(new Error('Database error'));
      
          // Mock the res object for the controller
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
      
          // Call the getRolesController function
          await getRolesController(null, res);
      
          // Check if roleService.getRoles was called
          expect(roleService.getRoles).toHaveBeenCalled();
      
          // Check if the response status and error message are correct
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });
    });

    
});        