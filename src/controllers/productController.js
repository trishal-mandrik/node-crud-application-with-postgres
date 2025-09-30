const db = require('../config/database')
const validationHelper = require('../helpers/validationHelper');

const productController = {};

productController.createProduct = async (req, res) => {
    const {product_name, quantity, price} = req.body;
    try {
        const validationResponse = validationHelper.verifyAllFieldsPresent({product_name, quantity, price});
        if (validationResponse.message) {
            return res.status(400).send({message: validationResponse.message});
        }

        await db.query(
            "Insert into public.products (productName, quantity, price) values ($1, $2, $3)",
            [product_name, quantity, price]
        );

        res.status(201).send({
            message: "Product added successfully",
            body: {
                product: {product_name, quantity, price}
            }
        })
    } catch (e) {
        res.status(500).send({message: "Error adding product", error: e.message});
    }
}

productController.listAllProducts = async (req, res) => {
    try {
        const response = await db.query('Select * from public.products order by productname');
        res.status(200).send(response.rows);
    } catch (e) {
        res.status(500).send({message: "Error fetching products", error: e.message});
    }
}

productController.findProductById = async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        if (isNaN(productId) || productId <= 0) {
            return res.status(400).send({message: "Please enter a valid product id"});
        }
        const response = await db.query('select * from public.products where productid = $1', [productId])
        res.status(200).send(response.rows);
    } catch (e) {
        res.status(500).send({message: "Error fetching product", error: e.message});
    }
}

productController.updateProductById = async (req, res) => {
    const productId = parseInt(req.params.id);
    const {product_name, quantity, price} = req.body;
    try {
        if (isNaN(productId) || productId <= 0) {
            return res.status(400).send({message: "Please enter a valid product id"});
        }

        const validationResponse = validationHelper.verifyAllFieldsPresent({product_name, quantity, price});
        if (validationResponse.message) {
            return res.status(400).send({message: validationResponse.message});
        }
        await db.query('update public.products set productname = $1, quantity = $2, price = $3 where productid = $4', [product_name, quantity, price, productId]);
        res.status(200).send({message: 'Product updated successfully'});
    } catch (e) {
        res.status(500).send({message: "Error updating product", error: e.message});
    }
}

productController.deleteProductById = async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        if (isNaN(productId) || productId <= 0) {
            return res.status(400).send({message: "Please enter a valid product id"});
        }
        await db.query('delete from public.products where productid = $1', [productId]);
        res.status(200).send({message: 'Product deleted successfully'});
    } catch (e) {
        res.status(500).send({message: "Error deleting product", error: e.message});
    }
}

module.exports = productController;