import { pool } from "../../config/dbConfig/database.js";
import { encodePassword } from "../../utils/bcrypt.js";
import { SQL_QUERIES } from "../../utils/queries.js";

async function createUserLogin(userData) {
  const { fname, lname, username, password, role_id } = userData;
  const encodedPassword = encodePassword(password);
  try {
    const [result] = await pool.query(
      `insert into user_login (username, password) values(?,?)`,
      [username, encodedPassword]
    );
    const loginId = result.insertId;
    await createUserProfile({ fname, lname, loginId, role_id });
    return { loginId, fname, lname };
  } catch (err) {
    throw new Error(`Failed to create User Login: ${err.message}`);
  }
}

async function createUserProfile(userData) {
  const { fname, lname, loginId, role_id } = userData;
  try {
    const [result, ...meta] = await pool.query(
      `insert into user_profile (fname, lname, loginId, role_id) values(?,?,?,?)`,
      [fname, lname, loginId, role_id]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`Failed to create User Profile: ${err.message}`);
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
