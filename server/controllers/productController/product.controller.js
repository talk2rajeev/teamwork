import * as productService from '../../services/productService/product.service.js';


async function createProductController(req,res) {
    const {productName, createdById, teamId} = req.body;
    try {
        const createdAt = new Date().toISOString();
        const data = await productService.createProduct(productName, createdById, teamId);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllProductsController(req,res) {
    try {
        const products = await productService.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function getAllProductsWithTeamController(req,res) {
    try {
        const products = await productService.getProductsWithTeam();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function updateProductController(req,res) {
    const productId = req.params.id;
    const {productName, teamId} = req.body;
    try {
        const success = await productService.updateProduct(productName, productId, teamId);
        if (success) {
            res.status(200).json({ message: 'Product updated successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



async function getProductByIdController(req,res) {
    const prodictId = req.params.id;
    // try {
    //     const product = await productService.getProductById(prodictId);
    //     if (user) {
    //         res.status(200).json(product);
    //     } else {
    //         res.status(404).json({ error: 'Product not found' });
    //     }
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
};

export { 
    createProductController,
    updateProductController,
    getAllProductsController,
    getAllProductsWithTeamController,
    getProductByIdController,
};



