const mongoose = require('mongoose')
const userSchema = require('./User')
const productSchema = require('./Product')

const User = mongoose.model('User', userSchema)
const Product = mongoose.model('Product', productSchema)

module.exports = {
  User,
  Product,
}