import express from "express";
import * as userStoryController from "../../controllers/userStoryController/userStory.controller.js";

const userStoryRoutes = express.Router();

userStoryRoutes.post(
  "/createUserStory",
  userStoryController.createUserStoryController
);
userStoryRoutes.post("/createBug", userStoryController.createBugController);
userStoryRoutes.put(
  "/updateUserStory/:id",
  userStoryController.updateUserStoryController
);
userStoryRoutes.get(
  "/getUserStoriesBySprintId/:id",
  userStoryController.getUserStoriesBySprintIdController
);
userStoryRoutes.get(
  "/getUserStoriesByProductId/:id",
  userStoryController.getUserStoriesByProductIdController
);
userStoryRoutes.get(
  "/getUserStoriesByEpicId/:id",
  userStoryController.getUserStoriesByEpicIdController
);
userStoryRoutes.get(
  "/getDetailedUserStoriesByUserStoryId/:productId/:sprintId/:userStoryId",
  userStoryController.getDetailedUserStoriesByUserStoryIdController
);
userStoryRoutes.get(
  "/getDetailedUserStoriesBySprintId/:productId/:sprintId",
  userStoryController.getDetailedUserStoriesBySprintIdController
);
userStoryRoutes.get(
  "/getDetailedUserStoriesByProductId/:id",
  userStoryController.getDetailedUserStoriesByProductIdController
);
userStoryRoutes.get(
  "/getDetailedUserStoriesByEpicId/:id",
  userStoryController.getDetailedUserStoriesByEpicIdController
);

export { userStoryRoutes };
