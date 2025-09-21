const productController = require('../controllers/productController');

const productRoute = [
    {
        'path': '/products',
        'method': 'post',
        'middlewares': [],
        'handlers': productController.createProduct
    },
    {
        'path': '/products',
        'method': 'get',
        'middlewares': [],
        'handlers': productController.listAllProducts
    },
    {
        'path': '/products/:id',
        'method': 'get',
        'middlewares': [],
        'handlers': productController.findProductById
    },
    {
        'path': '/products/:id',
        'method': 'put',
        'middlewares': [],
        'handlers': productController.updateProductById
    },
    {
        'path': '/products/:id',
        'method': 'delete',
        'middlewares': [],
        'handlers': productController.deleteProductById
    }
]

module.exports = productRoute;