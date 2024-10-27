import * as productService from "../../services/productService/product.service.js";
import * as teamService from "../../services/teamService/team.service.js";
import * as formatter from "../../utils/formatter.js";
import CustomResponse from "../../utils/customResponse.js";
import { getErrorResponse } from "../../utils/errorResponse.js";

async function createProductController(req, res) {
  const { productName, createdById, teamId } = req.body;
  const response = new CustomResponse(
    false,
    "Product created successfully.",
    201
  );

  try {
    if (productName && createdById) {
      const data = await productService.createProduct(
        productName,
        createdById,
        teamId
      );
      if (data.affectedRows === 0) {
        response.success = false;
        response.message = "Failed to created Product.";
        response.status = 500;
      }
    } else {
      response.success = false;
      response.message = "Bad Request. Pleaes validate the request payload.";
      response.status = 400;
    }
    res.status(response.status).json(response);
  } catch (error) {
    const errResponse = getErrorResponse(error, response);
    res.status(errResponse.status).json(errResponse);
  }
}

async function getAllProductsController(req, res) {
  const response = new CustomResponse(true, "", 200, []);
  try {
    const products = await productService.getProducts();
    response.data = products;
    if (!products) {
      response.success = false;
      response.message = "Failed to get Products.";
      response.status = 500;
    }
    res.status(response.status).json(response);
  } catch (error) {
    const errResponse = getErrorResponse(error, response);
    res.status(errResponse.status).json(errResponse);
  }
}

async function getAllProductsWithTeamController(req, res) {
  try {
    const products = await productService.getProductsWithTeam();
    const formattedProduct = formatter.getFormattedproduct(products);
    res.status(200).json(formattedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateProductController(req, res) {
  const productId = req.params.id;
  const payload = req.body;
  const response = new CustomResponse(
    true,
    "Product updated successfully",
    200,
    []
  );
  try {
    const success = await productService.updateProduct(payload, productId);

    if (!success) {
      response.success = false;
      response.message = "product not found.";
      response.status = 404;
    }
    res.status(response.status).json(response);
  } catch (error) {
    const errResponse = getErrorResponse(error, response);
    res.status(errResponse.status).json(errResponse);
  }
}

async function getProductByIdController(req, res) {
  const productId = req.params.id;
  const response = new CustomResponse(
    true,
    "Product with team not found.",
    404,
    []
  );
  try {
    const products = await productService.getProductById(productId);
    const teamId = products[0]?.teamId;
    if (products) {
      const teamWithUsers = await teamService.getTeamWithUsersById(teamId);
      const formattedProduct = formatter.getFormattedproduct(products);
      const productWithTeamUsers = formatter.getFormattedproductWithTeamUsers(
        formattedProduct,
        teamWithUsers
      );
      response.success = true;
      response.message = "";
      response.status = 200;
      response.data = productWithTeamUsers;
    }
    res.status(response.status).json(response);
  } catch (error) {
    const errResponse = getErrorResponse(error, response);
    res.status(errResponse.status).json(errResponse);
  }
}

export {
  createProductController,
  updateProductController,
  getAllProductsController,
  getAllProductsWithTeamController,
  getProductByIdController,
};
