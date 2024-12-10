import * as userStoryService from "../../services/userStoryService/userStory.service.js";
import CustomResponse from "../../utils/customResponse.js";
import { getErrorResponse } from "../../utils/errorResponse.js";

async function createUserStoryController(req, res) {
  const payload = req.body;
  try {
    const { title, description, userStoryId, reporterUserId, productId } =
      payload;
    if ((title, description, userStoryId, reporterUserId, productId)) {
      const data = await userStoryService.createUserStory(payload);
      res.status(201).json(data);
    } else {
      res
        .status(400)
        .json({ error: "Bad request, please check your request payload" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createBugController(req, res) {
  const payload = req.body;
  try {
    const {
      title,
      description,
      userStoryId,
      reporterUserId,
      productId,
      userStoryType,
      priority,
    } = payload;
    if (
      (title,
      description,
      userStoryId,
      reporterUserId,
      productId,
      userStoryType,
      priority)
    ) {
      const data = await userStoryService.createBug(payload);
      res.status(201).json(data);
    } else {
      res
        .status(400)
        .json({ error: "Bad request, please check your request payload" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateUserStoryController(req, res) {
  const userStoryId = req.params.id;
  const payload = req.body;

  const response = new CustomResponse(true, "", 200, []);
  try {
    const data = await userStoryService.updateUserStory(payload, userStoryId);
    response.data = data;
    if (!data) {
      response.success = false;
      response.message = "Failed to update userstory.";
      response.status = 500;
    }
    res.status(response.status).json(response);
  } catch (error) {
    const errResponse = getErrorResponse(error, response);
    res.status(errResponse.status).json(errResponse);
  }
}

async function getUserStoriesBySprintIdController(req, res) {
  const sprintId = req.params.id;
  try {
    // const userId = await userProfileService.saveUserProfile(fname, lname, role);
    const data = await userStoryService.getUserStoriesBySprintId(sprintId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserStoriesByProductIdController(req, res) {
  const productId = req.params.id;
  console.log("getting getUserStoriesByProductId ", productId);
  try {
    // const userId = await userProfileService.saveUserProfile(fname, lname, role);
    const data = await userStoryService.getUserStoriesByProductId(productId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserStoriesByEpicIdController(req, res) {
  const epicId = req.params.id;
  console.log("req.query ", req.query);
  try {
    // const userId = await userProfileService.saveUserProfile(fname, lname, role);
    const data = await userStoryService.getUserStoriesByEpicId(epicId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDetailedUserStoriesByUserStoryIdController(req, res) {
  const { productId, sprintId, userStoryId } = req.params;
  const response = new CustomResponse(true, "", 200, []);
  try {
    const data = await userStoryService.getDetailedUserStoriesByUserStoryId(
      productId,
      sprintId,
      userStoryId
    );
    response.data = data;
    if (!data) {
      response.success = false;
      response.message = "Failed to get userstories.";
      response.status = 500;
    }
    console.log(response);
    res.status(response.status).json(response);
  } catch (error) {
    const errResponse = getErrorResponse(error, response);
    res.status(errResponse.status).json(errResponse);
  }
}

async function getDetailedUserStoriesBySprintIdController(req, res) {
  const { productId, sprintId } = req.params;
  const response = new CustomResponse(true, "", 200, []);
  try {
    const data = await userStoryService.getDetailedUserStoriesBySprintId(
      productId,
      sprintId
    );
    response.data = data;
    if (!data) {
      response.success = false;
      response.message = "Failed to get userstories.";
      response.status = 500;
    }
    res.status(response.status).json(response);
  } catch (error) {
    const errResponse = getErrorResponse(error, response);
    res.status(errResponse.status).json(errResponse);
  }
}

async function getDetailedUserStoriesByProductIdController(req, res) {
  const productId = req.params.id;
  try {
    const data = await userStoryService.getDetailedUserStoriesByProductId(
      productId
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDetailedUserStoriesByEpicIdController(req, res) {
  const epicId = req.params.id;
  try {
    const data = await userStoryService.getDetailedUserStoriesByEpicId(epicId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  createUserStoryController,
  createBugController,
  updateUserStoryController,
  getUserStoriesBySprintIdController,
  getUserStoriesByProductIdController,
  getUserStoriesByEpicIdController,
  getDetailedUserStoriesByUserStoryIdController,
  getDetailedUserStoriesBySprintIdController,
  getDetailedUserStoriesByProductIdController,
  getDetailedUserStoriesByEpicIdController,
};
