export const SQL_QUERIES = {
    product: {
        insertWithTeamQuery: 'insert into product (productName, createdById, teamId) values(?,?,?)',
        insertWithoutTeamQuery: 'insert into product (productName, createdById) values(?,?)',
        getProducts: `SELECT * from product`,
        getProductsWithTeamQuery: `SELECT product.productId, product.productName, 
            user_profile.profileId, user_profile.fname, user_profile.lname,
            team.teamId, team.teamName
            FROM  product
            JOIN  user_profile ON product.createdById = user_profile.profileId
            JOIN team ON product.teamId = team.teamId;`,
        getProductByIdQuery: `SELECT product.productId, product.productName, 
            user_profile.profileId, user_profile.fname, user_profile.lname,
            team.teamId, team.teamName
            FROM  product
            JOIN  user_profile ON product.createdById = user_profile.profileId
            JOIN team ON product.teamId = team.teamId WHERE productId = ?`,
        updateProductName: `Update product SET productName = ? WHERE productId = ?`,
        updateProductTeam: `Update product SET teamId = ? WHERE productId = ?`,
        updateProductNameAndTeam: `Update product SET productName = ?, teamId = ? WHERE productId = ?`,
    },
    user: {
        createUserLogin: 'insert into users (username, password, createdAt) values(?,?,?)',
        createUserProfile: 'insert into user_profile (fname, lname, roleId, userId, createdAt) values(?,?,?,?,?)',
    },
    team: {
        insertQuery: `insert into team (teamName, createdById) values(?, ?)`,
        getTeamsQuery: `select * from team`,
        getTeamByIdQuery: `select * from team where teamId = ?`,
        getTeamWithUsersByIdQuery: `SELECT
                up.profileId,
                up.fname,
                up.lname,
                t.teamId,
                t.teamName
            FROM
                user_profile up
            JOIN
                user_team_role utr ON up.profileId = utr.profileId
            JOIN
                team t ON utr.teamId = t.teamId
            WHERE
                t.teamId = ?`,
        updateTeamQuery: `Update team SET teamName = ? WHERE teamId = ?`,
        assignRoleToUserInTeamQuery: `insert into user_team_role (teamId, profileId, roleId) values(?, ?, ?)`,
        updateUserRoleInTeamQuery: `update user_team_role SET roleId = ? WHERE userTeamRoleId = ?`,
        getAllTeamsWithUsersQuery: `SELECT up.fname AS first_name, up.lname AS last_name, t.teamName AS team_name, r.roleName AS role_name
            FROM user_profile up
            JOIN user_team_role utr ON up.profileId = utr.profileId
            JOIN team t ON utr.teamId = t.teamId
            JOIN role r ON utr.roleId = r.roleId`
    },
    epic: {
        createEpicQuery: 'insert into epic (epicName, epicDescription, createdById, productId) values(?,?,?,?)',
        getEpics: 'select * from epic',
        getEpicById: 'select * from epic WHERE epicId = ?',
        getEpicsByProductIdQuery: `SELECT * FROM epic WHERE productId = ?`,
        getEpicByProductId: 'select * from epic where epicId = ?',
    },
    sprint: {
        createSprintQuery: 'insert into sprint (sprintName, createdById, productId, startDate, endDate) values(?,?,?,?,?)',
        getAllSprintQuery: 'SELECT * FROM sprint',
        getSprintByIdQuery: 'SELECT * FROM sprint WHERE sprintId = ?',
        getSprintByProductIdQuery: `SELECT s.sprintId, s.sprintName, s.createdAt, s.startDate, s.endDate,
                up.fname, up.lname, up.profileId,
                p.productName, p.productId
        FROM sprint s
        JOIN user_profile up ON up.profileId = s.createdById
        JOIN product p ON s.productId = p.productId
        WHERE s.productId =?`,
    }
};