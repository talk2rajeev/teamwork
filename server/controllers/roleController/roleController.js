import * as roleService from '../../services/roleService/roleService.js';

function formatRolesList(roles) {
    return roles.map(r => ({
        roleId: r.roleId,
        roleName: r.roleName,
        createdBy: {
            profileId: r.profileId,
            fname: r.fname,
            lname: r.lname
        }
    }))
}

async function createRoleController(req,res) {
    const {roleName, createdById} = req.body;
    try {
        // const userId = await userProfileService.saveUserProfile(fname, lname, role);
        const data = await roleService.createRole(roleName, createdById);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateRoleController(req,res) {
    const roleId = req.params.id;
    const {roleName} = req.body;
    try {
        const success = await roleService.updateRole(roleName, roleId);
        if (success) {
            res.status(200).json({ message: 'Role updated successfully' });
        } else {
            res.status(404).json({ error: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getRolesController(req,res) {
    try {
        const users = await roleService.getRoles();
        const formattedRoles = formatRolesList(users);
        console.log(formattedRoles);
        res.status(200).json(formattedRoles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function getRoleByIdController(req,res) {
    const id = req.params.id;
    try {
        const user = await roleService.getRoleById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            // If user is not found, return 404
            res.status(404).json({ error: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { 
    createRoleController,
    updateRoleController,
    getRolesController,
    getRoleByIdController,
};



