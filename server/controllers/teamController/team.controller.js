import * as teamService from '../../services/teamService/team.service.js';


async function createTeamController(req,res) {
    const {teamName} = req.body;
    try {
        // const userId = await userProfileService.saveUserProfile(fname, lname, role);
        const data = await teamService.createTeam(teamName);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateTeamController(req,res) {
    const teamId = req.params.id;
    const {teamName} = req.body;
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

export { 
    createTeamController,
    updateTeamController,
    getTeamsController,
    getTeamByIdController,
};



