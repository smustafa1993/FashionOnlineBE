const { Schema } = require("mongoose")

const prodSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String },
        category: {type: String },
        price: {type: Number, required: true},
        stock: {type: Number, required: true},
        img: {type: String, default:"https://postimg.cc/dD0LL9cF"},
        color: {type: String }
    },
    { timestamps: true }
)

module.exports = prodSchema