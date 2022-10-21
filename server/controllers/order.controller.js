const express = require('express');
const { Order } = require('../models/order.model');

module.exports.getOrder = (request, response) => {
    Order.find()
        .then(order => response.json(order))
        .catch(err => response.json(err))
}