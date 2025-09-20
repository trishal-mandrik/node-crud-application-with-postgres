const db = require('../config/database')

exports.createProduct = async (req, res) => {
    const { product_name, quantity, price } = req.body;
    const { rows } = await db.query(
        "Insert into products (productName, quantity, price) values ($1, $2, $3)",
        [product_name, quantity, price]
    );

    res.status(201).send({
        message: "Product added successfully",
        body: {
            product: { product_name, quantity, price }
        }
    })
}