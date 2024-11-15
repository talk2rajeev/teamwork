import { pool } from "../../config/dbConfig/database.js";
import { SQL_QUERIES } from "../../utils/queries.js";

async function createProduct(productName, profileId, teamId) {
  try {
    let query;
    let values;
    if (teamId) {
      query = SQL_QUERIES.product.insertWithTeamQuery;
      values = [productName, profileId, teamId, profileId];
    } else {
      query = SQL_QUERIES.product.insertWithoutTeamQuery;
      values = [productName, profileId, profileId];
    }
    const result = await pool.query(query, values);
    return result[0];
  } catch (err) {
    throw new Error(`Failed to create product: ${err.message}`);
  }
}

async function getProducts() {
  try {
    const [data, ...meta] = await pool.query(
      SQL_QUERIES.product.getProductsQuery
    );
    return data;
  } catch (err) {
    throw new Error(`Failed to get products: ${err.message}`);
  }
}

async function getProductById(id) {
  try {
    const [data, ...meta] = await pool.query(
      SQL_QUERIES.product.getProductByIdQuery,
      [id]
    );
    return data;
  } catch (err) {
    throw new Error(`Failed to get product by id: ${err.message}`);
  }
}

async function updateProduct(payload, productId) {
  console.log("updateProduct service");
  try {
    const query =
      "UPDATE product SET " +
      Object.keys(payload)
        .map((key) => `${key} = ?`)
        .join(",") +
      " WHERE productId = ?";
    const params = [...Object.values(payload), productId];
    const result = await pool.query(query, params);
    return result;
  } catch (err) {
    throw new Error(`Failed to update product: ${err.message}`);
  }
}

async function getProductsWithTeam() {
  try {
    const [data, ...meta] = await pool.query(
      SQL_QUERIES.product.getProductsWithTeamQuery
    );
    return data;
  } catch (err) {
    throw new Error(`Failed to get products: ${err.message}`);
  }
}

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  getProductsWithTeam,
};
