



const mongoose = require('mongoose');

const addToCart = new mongoose.Schema({
    productId: String,
    quantity: Number,
    userId: String


}, {
    timestamps: true
})

const addToCartModel = mongoose.model("addToCartProduct", addToCart)
module.exports = addToCartModel



