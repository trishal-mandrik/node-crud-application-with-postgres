const db = require('../config/database')

exports.createProduct = async (req, res) => {
    const {product_name, quantity, price} = req.body;
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
}

exports.listAllProducts = async (req, res) => {
    const response = await db.query('Select * from public.products order by productname');
    res.status(200).send(response.rows);
}

exports.findProductById = async (req, res) => {
    const productId = parseInt(req.params.id);
    const response = await db.query('select * from public.products where productid = $1', [productId])
    res.status(200).send(response.rows);
}

exports.updateProductById = async (req, res) => {
    const productId = parseInt(req.params.id);
    const {product_name, quantity, price} = req.body;
    await db.query('update public.products set productname = $1, quantity = $2, price = $3 where productid = $4', [product_name, quantity, price, productId]);
    res.status(200).send({message: 'Product updated successfully'});
}

exports.deleteProductById = async (req, res) => {
    const productId = parseInt(req.params.id);
    await db.query('delete from public.products where productid = $1', [productId]);
    res.status(200).send({message: 'Product deleted successfully'});
}