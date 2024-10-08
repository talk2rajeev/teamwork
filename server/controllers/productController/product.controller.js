import * as productService from "../../services/productService/product.service.js";
import * as teamService from "../../services/teamService/team.service.js";
import * as formatter from "../../utils/formatter.js";

async function createProductController(req, res) {
  const { productName, createdById, teamId } = req.body;
  // try {
  //     const data = await productService.createProduct(productName, createdById, teamId);
  //     res.status(201).json(data);
  // } catch (error) {
  //     res.status(500).json({ error: error.message });
  // }
  try {
    if (productName && createdById && !teamId) {
      // const userId = await userProfileService.saveUserProfile(fname, lname, role);
      const data = await productService.createProduct(productName, createdById);
      res.status(201).json(data);
    } else if (productName && createdById && teamId) {
      const data = await productService.createProduct(
        productName,
        createdById,
        teamId
      );
      res.status(201).json(data);
    } else {
      res.status(500).json({
        error: "productName, creator profile id and teamId is mandatory",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllProductsController(req, res) {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  console.log("updateProduct Controller");
  try {
    const success = await productService.updateProduct(payload, productId);
    if (success) {
      res
        .status(200)
        .json({ message: "Product updated successfully", status: "success" });
    } else {
      res.status(404).json({ message: "Product not found", status: "fail" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: "fail" });
  }
}

async function getProductByIdController(req, res) {
  const productId = req.params.id;
  try {
    const products = await productService.getProductById(productId);
    console.log(products);
    const teamId = products[0]?.teamId;
    if (products) {
      const teamWithUsers = await teamService.getTeamWithUsersById(teamId);
      const formattedProduct = formatter.getFormattedproduct(products);
      const productWithTeamUsers = formatter.getFormattedproductWithTeamUsers(
        formattedProduct,
        teamWithUsers
      );

      res.status(200).json(productWithTeamUsers);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  createProductController,
  updateProductController,
  getAllProductsController,
  getAllProductsWithTeamController,
  getProductByIdController,
};
