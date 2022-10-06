const { Product } = require('../models/product.model');

module.exports.getProduct = (request, response) => {
    Product.find().sort({"name" : 1})
        .then(product => response.json(product))
        .catch(err => response.json(err))
}

module.exports.createProduct = (request, response) => {
    const { title, description, price, image } = request.body;
    Product.create({
        title,
        description,
        price,
        image
    })
        .then(product => response.json(product))
        .catch(err => response.status(400).json(err))
}

module.exports.getOneProduct = (request, response) => {
    Product.findOne({ _id: request.params.id })
        .then(product => response.json(product))
        .catch(err => response.json(err))
}

module.exports.updateProduct = (request, response) => {
    Product.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
        .then(updatedProduct => response.json(updatedProduct))
        .catch(err => response.json(err))
}

module.exports.deleteProduct = (request, response) => {
    Product.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}