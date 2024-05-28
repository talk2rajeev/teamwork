import express from 'express';
import * as productController from '../../controllers/productController/product.controller.js';

const productRoutes = express.Router();


productRoutes.post('/createProduct', productController.createProductController);
productRoutes.get('/getAllProducts', productController.getAllProductsController);
productRoutes.get('/getAllProductsWithTeam', productController.getAllProductsWithTeamController);
productRoutes.put('/updateProduct/:id', productController.updateProductController);
productRoutes.get('/getProductById/:id', productController.getProductByIdController);

export { productRoutes };
