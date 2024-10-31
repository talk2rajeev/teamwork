import * as userService from "../../services/userService/user.service.js";
import CustomResponse from "../../utils/customResponse.js";
import { getErrorResponse } from "../../utils/errorResponse.js";

async function createUserLoginController(req, res) {
  const user = req.body;
  const response = new CustomResponse(true, "User created Successfully.", 201);
  try {
    // const userId = await userProfileService.saveUserProfile(fname, lname, role);
    const data = await userService.createUserLogin(user);

    if (data.affectedRows <= 1) {
      response.success = false;
      response.message = "Failed to create User.";
      response.status = 500;
    }
    res.status(response.status).json(response);
  } catch (error) {
    const errResponse = getErrorResponse(error, response);
    res.status(errResponse.status).json(errResponse);
  }
}

async function updateUserProfileController(req, res) {
  const userId = req.params.id;
  const userData = req.body;
  try {
    const success = await userService.updateUserProfile(userData, userId);
    if (success) {
      res.status(200).json({ message: "User profile updated successfully" });
    } else {
      res.status(404).json({ error: "User profile not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUsersController(req, res) {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function searchUsersController(req, res) {
  const searchValue = req.query.searchValue;
  try {
    const users = await userService.searchUsers(searchValue);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserByIdController(req, res) {
  const id = req.params.id;
  try {
    const user = await userService.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      // If user is not found, return 404
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAdminUsersController(req, res) {
  try {
    const user = await userService.getAdminUsers();
    if (user) {
      res.status(200).json(user);
    } else {
      // If user is not found, return 404
      res.status(404).json({ error: "Admin users not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  createUserLoginController,
  updateUserProfileController,
  getUsersController,
  getUserByIdController,
  getAdminUsersController,
  searchUsersController,
};
