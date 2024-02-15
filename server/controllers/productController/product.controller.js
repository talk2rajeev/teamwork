import * as productService from '../../services/productService/product.service.js';


async function createProductController(req,res) {
    const {productName, userId} = req.body;
    try {
        const data = await productService.createProduct(productName, userId);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateProductController(req,res) {
    const productId = req.params.id;
    const {productName} = req.body;
    try {
        const success = await productService.updateProduct(productName, productId);
        if (success) {
            res.status(200).json({ message: 'Product updated successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getProductsController(req,res) {
    try {
        const products = await productService.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function getProductByIdController(req,res) {
    const prodictId = req.params.id;
    try {
        const product = await productService.getProductById(prodictId);
        if (user) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { 
    createProductController,
    updateProductController,
    getProductsController,
    getProductByIdController,
};



