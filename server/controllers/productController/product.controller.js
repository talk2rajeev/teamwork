import * as productService from '../../services/productService/product.service.js';
import * as teamService from '../../services/teamService/team.service.js';


function getFormattedproduct(products) {
    return products.map(p => {
        const {productId, productName, profileId, fname, lname, teamId, teamName} = p;
        return {
            productId,
            productName,
            createdBy: {
                profileId,
                fname,
                lname
            },
            team: {
                teamId,
                teamName
            }
        }
    });
}

function getFormattedproductWithTeamUsers(products, teamsWithUsers) {
    return products.map(p => {
        return {
            ...p,
            team: {
                ...p.team,
                teamsWithUsers
            }
        }
    });
}

async function createProductController(req,res) {
    const {productName, createdById, teamId} = req.body;
    try {
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
        const formattedProduct = getFormattedproduct(products);
        res.status(200).json(formattedProduct);
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
    const productId = req.params.id;
    try {
        const products = await productService.getProductById(productId);
        const teamId = products[0]?.teamId;
        if (products) {
            const teamWithUsers = await teamService.getTeamWithUsersById(teamId);
            const formattedProduct = getFormattedproduct(products);
            const productWithTeamUsers = getFormattedproductWithTeamUsers(formattedProduct, teamWithUsers);
            // const productWithTeamUsers = formattedProduct.map(p => ({...p, teamUsers: teamWithUsers}));
            console.log('teamWithUsers ', teamWithUsers);
            res.status(200).json(productWithTeamUsers);
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
    getAllProductsController,
    getAllProductsWithTeamController,
    getProductByIdController,
};



