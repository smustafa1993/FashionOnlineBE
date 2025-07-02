const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const cartSchema = new Schema(
    {
        status: {type: String},
        items: [{ product: {type: mongoose.Types.ObjectId, ref: 'Product'},quantity: {type: Number} }],
        user: [{type: mongoose.Types.ObjectId, ref: 'User'}],
        
    },
    { timestamps: true }
)
module.exports = cartSchema