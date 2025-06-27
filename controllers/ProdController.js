const { Product } = require("../models")
const middleware = require("../middleware")

const GetProds = async (req, res) => {
    try {
        const prods = await Product.find({}).sort({ createdAt:-1})
        res.status(200).send(prods)
    } catch (error) {
        throw error
    }
}

const GetProdById = async (req, res) => {
    try {
        const prod = await Product.findById(req.params.id)
        if(!prod){
            return res.status(404).send({ msg: "Product not found!!"})
        }
        res.status(200).send(prod)
    } catch (error) {
        res.status(500).send({ msg: "Internal server errr" })
    }
}
const CreateProd = async (req, res) => {
    try {
        //use spread to create a copy of the object
        const prod = await Product.create({...req.body })
        res.status(200).send(prod)
    } catch (error) {
        throw error
    }
}

const UpdateProd = async (req, res) => {
    try {
        const prod = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(200).send(prod)
    } catch (error) {
        throw error
    }
}

const DeleteProd = async (req, res) => {
    try {
        await Product.deleteOne({_id: req.params.id })
        res.status(200).send({ msg: "Product Deleted", payload: req.params.id, status: "Ok"})
    } catch (error) {
        throw error
    }
}

module.exports = {
    GetProds,
    GetProdById,
    CreateProd,
    UpdateProd,
    DeleteProd
}