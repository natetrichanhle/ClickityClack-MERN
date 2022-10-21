const OrderController = require('../controllers/order.controller');
module.exports = function (app) {
    app.get('/api/order', OrderController.getOrder);
}