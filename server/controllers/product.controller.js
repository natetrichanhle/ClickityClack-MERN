const express = require('express');
const { Product } = require('../models/product.model');
const cloudinary = require('../utils/cloudinary')


module.exports.getProduct = (request, response) => {
    Product.find().sort({"name" : 1})
        .then(product => response.json(product))
        .catch(err => response.json(err))
}

// module.exports.createProduct = (request, response) => {
//     const { title, description, price, image, user } = request.body;
//     console.log(request.body);
//     Product.create({
//         title,
//         description,
//         price,
//         image,
//         user
//     })
//         .then(product => response.json(product))
//         .catch(err => response.status(400).json(err))
// }

module.exports.createProduct = async (request, response) => {
    const { title, description, price, image, user } = request.body;
    
    try {
        if(image) {
            const uploadRes = await cloudinary.uploader.upload(image, {
                upload_preset: 'onlineShop'
            })

            if(uploadRes) {
                const product = new Product({
                    title, 
                    description, 
                    price, 
                    image: uploadRes,
                    user
                })

                const savedProduct = await product.save()

                response.status(200).send(savedProduct);
            }
        }
    } catch(error) {
        console.log(error)
        response.status(400).json(error)
    }
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