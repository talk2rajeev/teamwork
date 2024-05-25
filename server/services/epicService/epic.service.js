import {pool} from '../../config/dbConfig/database.js';
import {SQL_QUERIES} from '../../utils/queries.js';

async function createEpic(payload) {
    try{
        const { epicName, epicDescription, createdById, productId } = payload;
        const result = await pool.query(SQL_QUERIES.epic.createEpicQuery, [epicName, epicDescription, createdById, productId]);
        return result[0];
    } catch(err) {
        throw new Error(`Failed to create epic: ${err.message}`);
    };
    
}

async function getEpics() {
    try{
        const result = await pool.query(SQL_QUERIES.epic.getEpics);
        return result[0];
    } catch(err) {
        throw new Error(`Failed to get the epics: ${err.message}`);
    };
    
}

async function getEpicById(epicId) {
    try{
        const result = await pool.query(SQL_QUERIES.epic.getEpicById, [epicId]);
        return result[0];
    } catch(err) {
        throw new Error(`Failed to get epic by epicId: ${err.message}`);
    };
    
}

async function  updateEpic(epicData, epicId) {
    try {
        console.log('eppicData ', epicData);
        const query = "Update epic SET " + Object.keys(epicData).map(key => `${key} = ?`).join(',')+ " WHERE epicId = ?";
        const params = [...Object.values(epicData), epicId];
        const result = await pool.query(query, params);
    
        return result;
    } catch(err) {
        throw new Error(`Failed to update Epic: ${err.message}`);
    };
}

async function getEpicsByProductId(productId) {
    try{
        const result = await pool.query(SQL_QUERIES.epic.getEpicsByProductIdQuery, [productId]);
        return result[0];
    } catch(err) {
        throw new Error(`Failed to get epic by productId: ${err.message}`);
    };
    
}



export { createEpic, getEpics, getEpicsByProductId, updateEpic, getEpicById};