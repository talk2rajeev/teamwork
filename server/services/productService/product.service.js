import {pool} from '../../config/dbConfig/database.js';
import {SQL_QUERIES} from '../../utils/queries.js';

async function createProduct(productName, profileId, teamId) {
    try{
        console.log(productName, profileId, teamId);
        let query;
        let values;
        if(teamId) {
            query = SQL_QUERIES.product.insertWithTeamQuery;
            values = [productName, profileId, teamId];
        } else {
            query = SQL_QUERIES.product.insertWithoutTeamQuery;
            values = [productName, profileId];
        }
        const result = await pool.query(query, values);
        return result[0];
    } catch(err) {
        throw new Error(`Failed to create product: ${err.message}`);
    };
    
}

async function  getProducts() {
    try {
        const [data, ...meta] = await pool.query(SQL_QUERIES.product.getProducts);
        return data;
    } catch(err) {
        throw new Error(`Failed to get products: ${err.message}`);
    };
}

async function  getProductsWithTeam() {
    try {
        const [data, ...meta] = await pool.query(SQL_QUERIES.product.getProductsWithTeamQuery);
        return data;
    } catch(err) {
        throw new Error(`Failed to get products: ${err.message}`);
    };
}

async function  getProductById(id) {
    try {
        const [data, ...meta] = await pool.query(SQL_QUERIES.product.getProductByIdQuery, [id]);
        return data;
    } catch(err) {
        throw new Error(`Failed to get product by id: ${err.message}`);
    };
}

async function  updateProduct(productName, productId, teamId) {
    try {
        let query, values;
        if(!teamId && productName) {
            query = SQL_QUERIES.product.updateProductName;
            values = [productName, productId];
        } else if(teamId && !productName) {
            query = SQL_QUERIES.product.updateProductTeam;
            values = [teamId, productId];
        } else {
            query = SQL_QUERIES.product.updateProductNameAndTeam;
            values = [productName, productId , teamId];
        }
        const result = await pool.query(query, values);
        return result;
    } catch(err) {
        throw new Error(`Failed to update product: ${err.message}`);
    };
}

export { createProduct, getProducts, getProductsWithTeam, getProductById, updateProduct };