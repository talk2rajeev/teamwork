import { pool } from "../../config/dbConfig/database.js";
import { SQL_QUERIES } from "../../utils/queries.js";

async function createSprint(payload) {
  const { sprintName, createdById, productId, startDate, endDate } = payload;
  try {
    const [result, ...meta] = await pool.query(
      SQL_QUERIES.sprint.createSprintQuery,
      [sprintName, createdById, productId, startDate, endDate]
    );
    return result;
  } catch (err) {
    throw new Error(`Failed to create sprint: ${err.message}`);
  }
}

async function getAllSprints() {
  try {
    const [result, ...meta] = await pool.query(
      SQL_QUERIES.sprint.getAllSprintQuery
    );
    return result;
  } catch (err) {
    throw new Error(`Failed to get all sprints: ${err.message}`);
  }
}

async function updateSprint(payload, sprintId) {
  if (payload && sprintId) {
    try {
      const query =
        "UPDATE sprint SET " +
        Object.keys(payload)
          .map((key) => `${key} = ?`)
          .join(",") +
        " WHERE sprintId = ?";
      const params = [...Object.values(payload), sprintId];
      const result = await pool.query(query, [...params]);
      return result;
    } catch (err) {
      throw new Error(`Failed to update sprint: ${err.message}`);
    }
  } else {
    throw new Error(`Failed to update sprint: sprintId is mandatory`);
  }
}

async function getSprintById(sprintId) {
  try {
    const [result, ...meta] = await pool.query(
      SQL_QUERIES.sprint.getSprintByIdQuery,
      [sprintId]
    );
    return result;
  } catch (err) {
    throw new Error(`Failed to get sprint by id: ${err.message}`);
  }
}

async function getSprintByProductId(productId) {
  try {
    const [result, ...meta] = await pool.query(
      SQL_QUERIES.sprint.getSprintByProductIdQuery,
      [productId]
    );
    return result;
  } catch (err) {
    throw new Error(`Failed to get sprint by productId: ${err.message}`);
  }
}

async function searchSprint(sprintName) {
  try {
    const [result, ...meta] = await pool.query(
      SQL_QUERIES.sprint.searchSprintQuery,
      [sprintName]
    );
    return result;
  } catch (err) {
    throw new Error(`Failed to get all sprints: ${err.message}`);
  }
}

export {
  createSprint,
  getAllSprints,
  updateSprint,
  getSprintById,
  getSprintByProductId,
  searchSprint,
};
