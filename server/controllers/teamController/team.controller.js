import * as teamService from '../../services/teamService/team.service.js';


async function createTeamController(req,res) {
    const {teamName, createdById} = req.body;
    try {
        // const userId = await userProfileService.saveUserProfile(fname, lname, role);
        const data = await teamService.createTeam(teamName, createdById);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateTeamController(req,res) {
    const {teamName} = req.body;
    const teamId = req.params.id;
    try {
        const success = await teamService.updateTeam(teamName, teamId);
        if (success) {
            res.status(200).json({ message: 'Team updated successfully' });
        } else {
            res.status(404).json({ error: 'Team not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getTeamsController(req,res) {
    try {
        const users = await teamService.getTeams();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function getTeamByIdController(req,res) {
    const id = req.params.id;
    try {
        const user = await teamService.getTeamById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            // If user is not found, return 404
            res.status(404).json({ error: 'Team not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function assignRoleToTeamController(req, res) {
    const {teamId, profileId, roleId} = req.body;
    try {
        const data = await teamService.assignRoleToTeam(teamId, profileId, roleId);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateUserRoleInTeamController(req, res) {
 const {roleId, userTeamRoleId} = req.body;
    try {
        const data = await teamService.updateUserRoleInTeam(roleId, userTeamRoleId);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllTeamsWithUsersController(req,res) {
    try {
        const teamWithUsers = await teamService.getAllTeamsWithUsers();
        
        const map = {};
        teamWithUsers.forEach(t => {
            const teamUsers = map[t.team_name];
            console.log(teamUsers);
            if(teamUsers) {
                teamUsers.push({first_name: t.first_name, last_name: t.last_name, role_name: t.role_name})
            } else {
                map[t.team_name] = [{first_name: t.first_name, last_name: t.last_name, role_name: t.role_name}]
            }
        });
        res.status(200).json(map);
    } catch (error) {
        res.status(500).json({ error: error.message });s
    }
};

export { 
    createTeamController,
    updateTeamController,
    getTeamsController,
    getTeamByIdController,
    assignRoleToTeamController,
    updateUserRoleInTeamController,
    getAllTeamsWithUsersController
};



