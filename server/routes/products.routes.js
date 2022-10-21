const express = require('express');
const { Product } = require('../models/product.model');
const cloudinary = require('../utils/cloudinary')

const router = express.Router();

router.post('/', async (req, res) => {
    const {title, description, price, image} = req.body;

    try{
        if (image) {
            const uploadRes = await cloudinary.uploader.upload(image, {
                upload_preset: 'onlineShop'
            })

            if(uploadRes) {
                const product = new Product({
                    title,
                    description,
                    price,
                    image: uploadRes
                })

                const savedProduct = await product.save()

                res.status(200).send(savedProduct)
            }
        }

    }catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get('/', async (req, res) => {
    try{
        const products = await Product.find()
        res.status(200).send(products)
    }catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router