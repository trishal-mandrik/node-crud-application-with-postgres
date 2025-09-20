const db = require('../config/database')

exports.createProduct = async (req, res) => {
    const { product_name, quantity, price } = req.body;
    const { rows } = await db.query(
        "Insert into public.products (productName, quantity, price) values ($1, $2, $3)",
        [product_name, quantity, price]
    );

    res.status(201).send({
        message: "Product added successfully",
        body: {
            product: { product_name, quantity, price }
        }
    })
}

exports.listAllProducts = async (req, res) => {
    const response = await db.query('Select * from public.products order by productname');
    res.status(200).send(response.rows);
}