import {pool} from '../../../config/dbConfig/database.js';
import * as roleService from '../role.service.js';

// Mock environment values
jest.mock('../../../config/dbConfig/database.js', () => ({
    pool: {
        query: jest.fn()
      }
  }));
  
  describe('Role Service', () => {
    describe('getRoles', () => {
      it('should return all the roles', async () => {
        // Mock query result
        const mockRolesData = [{
            "roleId": 1,
            "roleName": "Admin",
            "createdBy": {
                "profileId": 2,
                "fname": "Amit",
                "lname": "Kumar"
            }
        }];
        pool.query.mockResolvedValueOnce([mockRolesData]);
  
        const userData = await roleService.getRoles();
  
        expect(pool.query).toHaveBeenCalledWith(`SELECT role.roleId, role.roleName, user_profile.profileId, user_profile.fname, user_profile.lname from role INNER JOIN user_profile ON role.createdById = user_profile.profileId`);
        expect(userData).toEqual(mockRolesData);
      });

  
      it('should throw an error when database query fails', async () => {
        // Mock query error
        const errorMessage = 'Database error';
        pool.query.mockRejectedValueOnce(new Error(errorMessage));
  
        
        await expect(roleService.getRoles()).rejects.toThrow(`Failed to get roles: ${errorMessage}`);
      });
    });

    describe('getRoleById', () => {
        it('should return role by ID', async () => {
            // Mock query result
            const mockRoleData = [{
                "roleId": 1,
                "roleName": "Admin",
                "profileId": 2,
                "fname": "Amit",
                "lname": "Kumar"
            }];
            pool.query.mockResolvedValueOnce([mockRoleData]);
      
            const roleId = 1;
            const roleData = await roleService.getRoleById(roleId);
      
            expect(pool.query).toHaveBeenCalledWith(`SELECT role.roleId, role.roleName, user_profile.profileId, user_profile.fname, user_profile.lname from role INNER JOIN user_profile ON role.createdById = user_profile.profileId where roleId = ?`, [roleId]);
            expect(roleData).toEqual(mockRoleData);
        });

        it('should throw an error when database query fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            pool.query.mockRejectedValueOnce(new Error(errorMessage));
      
            const roleId = 1;
            await expect(roleService.getRoleById(roleId)).rejects.toThrow(`Failed to get Role by id: ${errorMessage}`);
          });
  
    });

    describe('createRole', () => {
        it('should create role ', async () => {
            // Mock query result
            const roleName= 'admin', createdById = 1;
      
            const mockRoleData = [{
                "roleId": 1,
                "roleName": "Admin",
                "profileId": 2,
                "fname": "Amit",
                "lname": "Kumar"
            }];
            pool.query.mockResolvedValueOnce([mockRoleData]);

            const res = await roleService.createRole(roleName, createdById);
      
            expect(pool.query).toHaveBeenCalledWith(`insert into role (roleName, createdById) values(?, ?)`, [roleName, createdById]);
            expect(res).toEqual(mockRoleData);
        });

        it('should throw an error when database query fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            pool.query.mockRejectedValueOnce(new Error(errorMessage));
      
            const roleName= 'admin', createdById = 1;
            await expect(roleService.createRole(roleName, createdById)).rejects.toThrow(`Failed to create role: ${errorMessage}`);
          });
  
    });

    describe('updateRole', () => {
        it('should update role ', async () => {
            // Mock query result
            const roleName= 'admin', roleId = 1;
      
            const mockRoleData = {
                  roleId: 1,
                  roleName: 'Admin',
                  profileId: 2,
                  fname: 'Amit',
                  lname: 'Kumar'
            };
            pool.query.mockResolvedValueOnce([mockRoleData]);

            const res = await roleService.updateRole(roleName, roleId);
      
            expect(pool.query).toHaveBeenCalledWith(`Update role SET roleName = ? WHERE roleId = ?`, [roleName, roleId]);
            expect(res[0]).toEqual(mockRoleData);
        });

        it('should throw an error when database query fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            pool.query.mockRejectedValueOnce(new Error(errorMessage));
      
            const roleName= 'admin', roleId = 1;
            await expect(roleService.updateRole(roleName, roleId)).rejects.toThrow(`Failed to update Role: ${errorMessage}`);
          });
  
    });

});