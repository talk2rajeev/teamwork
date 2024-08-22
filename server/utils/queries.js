export const SQL_QUERIES = {
  product: {
    insertWithTeamQuery:
      "insert into product (productName, createdById, teamId, product_owner_id) values(?,?,?,?)",
    insertWithoutTeamQuery:
      "insert into product (productName, createdById, product_owner_id) values(?,?,?)",
    getProductsQuery: `select product.productId, product.productName, product.product_owner_id,
            user_profile.fname as product_owner_fname, user_profile.lname  as product_owner_lname
            FROM product
            JOIN  user_profile ON user_profile.profileId = product.product_owner_id;`,
    getProductsWithTeamQuery: `SELECT p.productId, p.productName, p.product_owner_id,
            up.profileId, up.fname, up.lname,
            upr.profileId as owner_profileID, upr.fname as owner_fname, upr.lname as owner_lname,
            t.teamId, t.teamName
            FROM  product p
            JOIN  user_profile up ON p.createdById = up.profileId
            JOIN user_profile upr ON p.product_owner_id = upr.profileId
            JOIN team t ON p.teamId = t.teamId;`,
    getProductByIdQuery: `SELECT p.productId, p.productName, p.product_owner_id,
            up.profileId, up.fname, up.lname,
            upr.profileId as owner_profileID, upr.fname as owner_fname, upr.lname as owner_lname,
            t.teamId, t.teamName
            FROM  product p
            JOIN  user_profile up ON p.createdById = up.profileId
            JOIN user_profile upr ON p.product_owner_id = upr.profileId
            JOIN team t ON p.teamId = t.teamId
            WHERE productId = ?`,
    updateProductName: `Update product SET productName = ? WHERE productId = ?`,
    updateProductTeam: `Update product SET teamId = ? WHERE productId = ?`,
    updateProductOwner: `Update product SET product_owner_id = ? WHERE productId = ?`,
    updateProductNameAndTeam: `Update product SET productName = ?, teamId = ?, product_owner_id = ? WHERE productId = ?`,
  },
  user: {
    createUserLogin:
      "insert into users (username, password, createdAt) values(?,?,?)",
    createUserProfile:
      "insert into user_profile (fname, lname, roleId, userId, createdAt) values(?,?,?,?,?)",
    getAllUsersWithLoginDetail: `SELECT user_login.loginId, user_login.username, user_profile.fname, user_profile.lname, user_profile.profileId, role.roleId, role.roleName
                FROM user_login 
                JOIN user_profile ON user_login.loginId=user_profile.loginId
                JOIN role ON user_profile.role_id=role.roleId;`,
    getAllUsers: `SELECT role.roleName, role.roleId, user_profile.profileId, user_profile.fname, user_profile.lname
      from role 
      INNER JOIN user_profile 
      ON role.roleId = user_profile.role_id`,
  },
  team: {
    insertQuery: `insert into team (teamName, createdById) values(?, ?)`,
    getTeamsQuery: `SELECT
                up.profileId as createdByProfileId,
                up.fname as createdByFname,
                up.lname as createdByLname,
                t.teamId,
                t.teamName
            FROM
                user_profile up
            JOIN
                team t ON up.profileId = t.createdById`,
    getTeamByIdQuery: `select * from team where teamId = ?`,
    getTeamWithUsersByIdQuery: `SELECT up.fname AS first_name, up.lname AS last_name, up.profileId as user_profile_id, t.teamName AS team_name, t.teamId as team_id, r.roleName AS role_name, r.roleId as role_id
        FROM user_profile up
        JOIN user_team_role utr ON up.profileId = utr.profileId
        JOIN team t ON utr.teamId = t.teamId
        JOIN role r ON utr.roleId = r.roleId 
        WHERE t.teamId = ?`,
    updateTeamQuery: `Update team SET teamName = ? WHERE teamId = ?`,
    assignRoleToUserInTeamQuery: `insert into user_team_role (teamId, profileId, roleId) values(?, ?, ?)`,
    updateUserRoleInTeamQuery: `update user_team_role SET roleId = ? WHERE userTeamRoleId = ?`,
    getAllTeamsWithUsersQuery: `SELECT up.fname AS first_name, up.lname AS last_name, up.profileId as user_profile_id, t.teamName AS team_name, t.teamId as team_id, r.roleName AS role_name, r.roleId as role_id
        FROM user_profile up
        JOIN user_team_role utr ON up.profileId = utr.profileId
        JOIN team t ON utr.teamId = t.teamId
        JOIN role r ON utr.roleId = r.roleId`,
  },
  epic: {
    createEpicQuery:
      "insert into epic (epicName, epicDescription, createdById, productId) values(?,?,?,?)",
    getEpics: "select * from epic",
    getEpicById: "select * from epic WHERE epicId = ?",
    getEpicsByProductIdQuery: `SELECT * FROM epic WHERE productId = ?`,
    getEpicByProductId: "select * from epic where epicId = ?",
  },
  sprint: {
    createSprintQuery:
      "insert into sprint (sprintName, createdById, productId, startDate, endDate) values(?,?,?,?,?)",
    getAllSprintQuery: "SELECT * FROM sprint",
    getSprintByIdQuery: "SELECT * FROM sprint WHERE sprintId = ?",
    getSprintByProductIdQuery: `SELECT s.sprintId, s.sprintName, s.createdAt, s.startDate, s.endDate,
                up.fname, up.lname, up.profileId,
                p.productName, p.productId
        FROM sprint s
        JOIN user_profile up ON up.profileId = s.createdById
        JOIN product p ON s.productId = p.productId
        WHERE s.productId =?`,
  },
  userStory: {
    createUserStoryQuery:
      "insert into user_story (title, description, statusId, assignedToUserId, reporterUserId, userStoryPoint, productId, epicId, sprintId) values(?,?,?,?,?,?,?,?,?)",
    createBugQuery:
      "insert into user_story (title, description, statusId, assignedToUserId, reporterUserId, userStoryPoint, productId, epicId, sprintId, userStoryType, priority) values(?,?,?,?,?,?,?,?,?,?,?)",
    getUserStoriesBySprintId: "SELECT * FROM user_story WHERE sprintId = ?",
    getUserStoriesByProductId: "SELECT * FROM user_story WHERE productId = ?",
    getUserStoriesByEpicId: "SELECT * FROM user_story WHERE epicId = ?",
    getDetailedUserStoriesBySprintId: `SELECT us.title, us.description, us.userStoryPoint, us.createdAt, us.userStoryType, us.priority,
                up.fname as assignedToFname, up.lname as assignedToLname, up.profileId as assignedtoId,
                s.status, s.statusId,
                p.productName, p.productId,
                e.epicName, e.epicId,
                sp.sprintName, sp.sprintId,
                upr.fname as reportedByFname, upr.lname as reportedByLname, upr.profileId as sotryReporterid
            FROM user_story us
            JOIN user_profile up ON up.profileId = us.assignedToUserId
            JOIN user_story_status s ON s.statusId = us.statusId
            JOIN product p ON p.productId = us.productid
            JOIN epic e ON e.epicId = us.epicId
            JOIN sprint sp ON sp.sprintId = us.sprintId
            JOIN user_profile upr ON upr.profileId = us.reporterUserId
            WHERE us.sprintID = ?`,
    getDetailedUserStoriesByProductId: `SELECT us.title, us.description, us.userStoryPoint, us.createdAt, us.userStoryType, us.priority,
                up.fname as assignedToFname, up.lname as assignedToLname, up.profileId as assignedtoId, 
                s.status, s.statusId,
                p.productName, p.productId,
                e.epicName, e.epicId,
                sp.sprintName, sp.sprintId,
                upr.fname as reportedByFname, upr.lname as reportedByLname, upr.profileId as sotryReporterid
            FROM user_story us
            JOIN user_profile up ON up.profileId = us.assignedToUserId
            JOIN user_story_status s ON s.statusId = us.statusId
            JOIN product p ON p.productId = us.productid
            JOIN epic e ON e.epicId = us.epicId
            JOIN sprint sp ON sp.sprintId = us.sprintId
            JOIN user_profile upr ON upr.profileId = us.reporterUserId
            WHERE us.productId = ?`,
    getDetailedUserStoriesByEpicId: `SELECT us.title, us.description, us.userStoryPoint, us.createdAt, us.userStoryType, us.priority,
                up.fname as assignedToFname, up.lname as assignedToLname, up.profileId as assignedtoId, 
                s.status, s.statusId,
                p.productName, p.productId,
                e.epicName, e.epicId,
                sp.sprintName, sp.sprintId,
                upr.fname as reportedByFname, upr.lname as reportedByLname, upr.profileId as sotryReporterid
            FROM user_story us
            JOIN user_profile up ON up.profileId = us.assignedToUserId
            JOIN user_story_status s ON s.statusId = us.statusId
            JOIN product p ON p.productId = us.productid
            JOIN epic e ON e.epicId = us.epicId
            JOIN sprint sp ON sp.sprintId = us.sprintId
            JOIN user_profile upr ON upr.profileId = us.reporterUserId
            WHERE us.epicId = ?`,
  },
};
