const mongoose = require('mongoose')
const userSchema = require('./User')
const prodSchema = require('./Product')
const CartSchema = require('./Cart')

const User = mongoose.model('User', userSchema)
const Product = mongoose.model('Product', prodSchema)
const Cart = mongoose.model('Cart', CartSchema)

module.exports = {
  User,
  Product,
  Cart
}
