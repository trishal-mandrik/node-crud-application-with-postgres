const router = require('express-promise-router')();
const productController = require('../controllers/product.controller')

router.post('/products', productController.createProduct);

module.exports = router;