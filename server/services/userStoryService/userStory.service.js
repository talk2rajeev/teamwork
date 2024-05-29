import {pool} from '../../config/dbConfig/database.js';
import {SQL_QUERIES} from '../../utils/queries.js';

async function createUserStory(payload) {
    const { title, description, statusId, assignedToUserId, reporterUserId, userStoryPoint, productId, epicId, sprintId } = payload;
    try{
        const [result, ...meta] = await pool.query(SQL_QUERIES.userStory.createUserStoryQuery, [title, description, statusId, assignedToUserId, reporterUserId, userStoryPoint, productId, epicId, sprintId]);
        return result;
    } catch(err) {
        throw new Error(`Failed to create user story: ${err.message}`);
    };
    
}

async function createBug(payload) {
    const { title, description, statusId, assignedToUserId, reporterUserId, userStoryPoint, productId, epicId, sprintId, userStoryType, priority } = payload;
    try{
        const [result, ...meta] = await pool.query(SQL_QUERIES.userStory.createBugQuery, [title, description, statusId, assignedToUserId, reporterUserId, userStoryPoint, productId, epicId, sprintId, userStoryType, priority]);
        return result;
    } catch(err) {
        throw new Error(`Failed to create Bug: ${err.message}`);
    };
}

async function updateUserStory(payload, userStoryId) {
    try{
        const query = "UPDATE user_story SET " + Object.keys(payload).map(key => `${key} = ?`).join(',')+ " WHERE userStoryId = ?";
        const params = [...Object.values(payload), userStoryId];
        const result = await pool.query(query, [...params]);
        return result;
    } catch(err) {
        throw new Error(`Failed to update user story: ${err.message}`);
    };
    
}

async function getUserStoriesBySprintId(sprintId) {
    try{
        const [result, ...meta] = await pool.query(SQL_QUERIES.userStory.getUserStoriesBySprintId, [sprintId]);
        return result;
    } catch(err) {
        throw new Error(`Failed to get user stories by sprintId: ${err.message}`);
    };
}

async function getUserStoriesByProductId(productId) {
    try{
        const [result, ...meta] = await pool.query(SQL_QUERIES.userStory.getUserStoriesByProductId, [productId]);
        return result;
    } catch(err) {
        throw new Error(`Failed to get user stories by productId: ${err.message}`);
    }; 
}

async function getUserStoriesByEpicId(epicId) {
    try{
        const [result, ...meta] = await pool.query(SQL_QUERIES.userStory.getUserStoriesByEpicId, [epicId]);
        return result;
    } catch(err) {
        throw new Error(`Failed to get user stories by epicId: ${err.message}`);
    }; 
}

async function getDetailedUserStoriesBySprintId(sprintId) {
    try{
        const [result, ...meta] = await pool.query(SQL_QUERIES.userStory.getDetailedUserStoriesBySprintId, [sprintId]);
        return result;
    } catch(err) {
        throw new Error(`Failed to get user stories by epicId: ${err.message}`);
    }; 
}

async function getDetailedUserStoriesByProductId(productId) {
    try{
        const [result, ...meta] = await pool.query(SQL_QUERIES.userStory.getDetailedUserStoriesByProductId, [productId]);
        return result;
    } catch(err) {
        throw new Error(`Failed to get user stories by epicId: ${err.message}`);
    }; 
}

async function getDetailedUserStoriesByEpicId(epicId) {
    try{
        const [result, ...meta] = await pool.query(SQL_QUERIES.userStory.getDetailedUserStoriesByEpicId, [epicId]);
        return result;
    } catch(err) {
        throw new Error(`Failed to get user stories by epicId: ${err.message}`);
    }; 
}


export { 
    createUserStory, 
    createBug,
    updateUserStory,
    getUserStoriesBySprintId,
    getUserStoriesByProductId,
    getUserStoriesByEpicId,
    getDetailedUserStoriesBySprintId,
    getDetailedUserStoriesByProductId,
    getDetailedUserStoriesByEpicId
}