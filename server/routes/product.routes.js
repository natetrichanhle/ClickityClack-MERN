const ProductController = require('../controllers/product.controller');
module.exports = function (app) {
    app.get('/api/product', ProductController.getProduct);
    app.post('/api/product/new', ProductController.createProduct);
    app.get('/api/product/:id', ProductController.getOneProduct);
    app.put('/api/product/edit/:id', ProductController.updateProduct);
    app.delete('/api/product/:id', ProductController.deleteProduct);
}