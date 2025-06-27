const mongoose = require('mongoose')
const userSchema = require('./User')
const prodSchema = require('./Product')

const User = mongoose.model('User', userSchema)
const Product = mongoose.model('Product', prodSchema)

module.exports = {
  User,
  Product
}
