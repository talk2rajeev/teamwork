import {pool} from '../../config/dbConfig/database.js';
import {SQL_QUERIES} from '../../utils/queries.js';

async function createProduct(productName, userId, createdAt) {
    try{
        console.log(productName, userId, createdAt);
        const result = await pool.query(SQL_QUERIES.product.insertQuery, [productName, userId, createdAt]);
        return result[0];
    } catch(err) {
        throw new Error(`Failed to create product: ${err.message}`);
    };
    
}

async function  getProducts() {
    try {
        const [data, ...meta] = await pool.query(SQL_QUERIES.product.getAllQuery);
        return data;
    } catch(err) {
        throw new Error(`Failed to get products: ${err.message}`);
    };
}

async function  getProductById(id) {
    try {
        const query = SQL_QUERIES.product.getByIdQuery;
        const [data, ...meta] = await pool.query(SQL_QUERIES.product.getByIdQuery, [id]);
        return data;
    } catch(err) {
        throw new Error(`Failed to get product by id: ${err.message}`);
    };
}

async function  updateProduct(productName, productId) {
    try {
        const result = await pool.query(SQL_QUERIES.product.updateQuery, [productName, productId]);
        return result;
    } catch(err) {
        throw new Error(`Failed to update product: ${err.message}`);
    };
}

export { createProduct, getProducts, getProductById, updateProduct };