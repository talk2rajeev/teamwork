import { pool } from "../../config/dbConfig/database.js";

async function findUserByUsername(username) {
  const [users, ...meta] = await pool
    .query(`select * from user_login where username = ?`, [username])
    .catch((err) => console.log(err));
  return users;
}

async function getUserTeamDetail(loginId) {
  const query = `SELECT up.fname, up.lname, t.teamName, t.teamId, r.roleName, r.roleId, ul.username
        FROM user_profile up
        JOIN  user_login ul ON up.loginId = ul.loginId 
        JOIN user_team_role utr ON up.profileId = utr.profileId
        JOIN team t ON utr.teamId = t.teamId
        JOIN role r ON utr.roleId = r.roleId
        WHERE ul.loginId = ?`;
  const [users, ...meta] = await pool
    .query(query, [loginId])
    .catch((err) => console.log(err));
  return users;
}

async function getUserDetail(loginId) {
  const query = `SELECT up.fname, up.lname, ul.username, r.roleName, r.roleId
        FROM user_profile up
        JOIN  user_login ul ON up.loginId = ul.loginId 
        JOIN role r ON r.roleId = up.role_id
        WHERE up.loginId = ?`;
  const [users, ...meta] = await pool
    .query(query, [loginId])
    .catch((err) => console.log(err));
  return users;
}

export { findUserByUsername, getUserDetail };
