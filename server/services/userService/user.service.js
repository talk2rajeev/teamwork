import { pool } from "../../config/dbConfig/database.js";
import { encodePassword } from "../../utils/bcrypt.js";
import { SQL_QUERIES } from "../../utils/queries.js";

async function createUserLogin(userData) {
  const { fname, lname, username, password, role_id } = userData;
  const encodedPassword = encodePassword(password);
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Insert into user_login
    const [loginResult] = await connection.query(
      "INSERT INTO user_login (username, password) VALUES (?, ?)",
      [username, encodedPassword]
    );
    const loginId = loginResult.insertId;

    // Insert into user_profile
    const [profileResult] = await connection.query(
      "INSERT INTO user_profile (fname, lname, loginId, role_id) VALUES (?, ?, ?, ?)",
      [fname, lname, loginId, role_id]
    );

    await connection.commit();
    return {
      affectedRows: loginResult.affectedRows + profileResult.affectedRows,
    };
  } catch (error) {
    await connection.rollback();
    console.error(`Failed to create User Login: ${error.message}`);
    throw new Error(`Failed to create User Login: ${error.message}`);
  } finally {
    console.error(`releasing connection`);
    connection.release(); // Ensure connection is released back to pool
  }
}

async function updateUserProfile(userData, userId) {
  try {
    const query =
      "Update user_profile SET " +
      Object.keys(userData)
        .map((key) => `${key} = ?`)
        .join(",") +
      " WHERE profileId = ?";
    const params = [...Object.values(userData), userId];
    const result = await pool.query(query, params);

    return result;
  } catch (err) {
    throw new Error(`Failed to update User Profile: ${err.message}`);
  }
}

async function getUsers() {
  try {
    const [data, ...meta] = await pool.query(SQL_QUERIES.user.getAllUsers);
    return data;
  } catch (err) {
    throw new Error(`Failed to get User detail: ${err.message}`);
  }
}

async function searchUsers(searchValue) {
  try {
    const [data, ...meta] = await pool.query(SQL_QUERIES.user.searchUser, [
      searchValue,
      searchValue,
    ]);
    return data;
  } catch (err) {
    throw new Error(`Failed to get User: ${err.message}`);
  }
}

async function getUserById(id) {
  try {
    const [data, ...meta] = await pool.query(
      `select * from user_profile where profileId = ?`,
      [id]
    );
    return data;
  } catch (err) {
    throw new Error(`Failed to get User by id: ${err.message}`);
  }
}

async function getAdminUsers() {
  try {
    const [data, ...meta] = await pool.query(
      `SELECT role.roleName, role.roleId, user_profile.profileId, user_profile.fname, user_profile.lname
      from role 
      INNER JOIN user_profile 
      ON role.roleId = user_profile.role_id 
      WHERE role.roleId = 1;`
    );
    return data;
  } catch (err) {
    throw new Error(`Failed to get User by id: ${err.message}`);
  }
}

export {
  getUsers,
  searchUsers,
  getUserById,
  createUserLogin,
  updateUserProfile,
  getAdminUsers,
};
