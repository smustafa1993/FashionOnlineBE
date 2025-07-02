const { Cart } = require("../models")
const { User } = require("../models")//So far no use for it here since im using localstorage and tokens. Keeping it just in case.. for now
const { Product } = require("../models")

const middleware = require("../middleware")

const GetCart = async (req, res) => {
    try {
        const {id: userId} = res.locals.payload
        const cart = await Cart.findOne({ user: userId }).populate('items.product')
        // res.send("HI THERE")
        // console.log("getCart route hit")
         res.status(200).send(cart)
    } catch (error) {
        res.send("WE HERE BUT WE WRONG")
        console.log("Bro we failed do something")
        throw error
        
    }
}



const AddToCart = async (req, res) => {
  try {
    const userId = res.locals.payload.id
    const { productId, quantity = 1 } = req.body

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).send({ msg: "Product not found" })
    }

    let cart = await Cart.findOne({ user: userId })

    // Create cart if not exists
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }]
      })
    } else {
      // Check if product already in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      )

      if (itemIndex > -1) {
        // If product exists, increment quantity
        cart.items[itemIndex].quantity += quantity
      } else {
        // Else, add new item
        cart.items.push({ product: productId, quantity })
      }

      await cart.save()
    }

    const updatedCart = await cart.populate("items.product")
    res.status(200).send(updatedCart)
  } catch (err) {
    console.error(err)
    res.status(500).send({ msg: "Server error adding to cart" })
  }
}


const RemoveFromCart = async (req, res) => {
  try {
    const { id: userId } = res.locals.payload
    const { productId } = req.body

    const cart = await Cart.findOne({ user: userId })
    if (!cart) {
      return res.status(404).send({ msg: "Cart not found" })
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    )

    await cart.save()
    const updatedCart = await cart.populate("items.product")

    console.log("removeFromCart executed")
    res.status(200).send(updatedCart)
  } catch (error) {
    console.log("Error in removeFromCart:", error.message)
    res.status(500).send({ msg: "Failed to remove product from cart" })
  }
}

const ClearCart = async (req, res) => {
  try {
    const { id: userId } = res.locals.payload
    const cart = await Cart.findOne({ user: userId })
    if (!cart) {
      return res.status(404).send({ msg: "Cart not found" })
    }

    cart.items = []
    await cart.save()
    const updatedCart = await cart.populate("items.product")

    console.log("clearCart executed")
    res.status(200).send(updatedCart)
  } catch (error) {
    console.log("Error in clearCart:", error.message)
    res.status(500).send({ msg: "Failed to clear cart" })
  }
}

const IncreaseQty = async (req, res) => {
  try {
    const { id: userId } = res.locals.payload
    const { productId } = req.body

    const cart = await Cart.findOne({ user: userId })
    if (!cart) {
      return res.status(404).send({ msg: "Cart not found" })
    }

    const item = cart.items.find(
      item => item.product.toString() === productId
    )

    if (!item) {
      return res.status(404).send({ msg: "Product not in cart" })
    }

    item.quantity += 1
    await cart.save()
    const updatedCart = await cart.populate("items.product")

    console.log("increaseQty executed")
    res.status(200).send(updatedCart)
  } catch (error) {
    console.log("Error in increaseQty:", error.message)
    res.status(500).send({ msg: "Failed to increase quantity" })
  }
}

const DecreaseQty = async (req, res) => {
  try {
    const { id: userId } = res.locals.payload
    const { productId } = req.body

    const cart = await Cart.findOne({ user: userId })
    if (!cart) {
      return res.status(404).send({ msg: "Cart not found" })
    }

    const item = cart.items.find(
      item => item.product.toString() === productId
    )

    if (!item) {
      return res.status(404).send({ msg: "Product not in cart" })
    }

    if (item.quantity > 1) {
      item.quantity -= 1
    } else {
      // Remove item if quantity would go below 1
      cart.items = cart.items.filter(
        item => item.product.toString() !== productId
      )
    }

    await cart.save()
    const updatedCart = await cart.populate("items.product")

    console.log("decreaseQty executed")
    res.status(200).send(updatedCart)
  } catch (error) {
    console.log("Error in decreaseQty:", error.message)
    res.status(500).send({ msg: "Failed to decrease quantity" })
  }
}




module.exports = {
    GetCart,
    AddToCart,
    RemoveFromCart,
    ClearCart,
    DecreaseQty,
    IncreaseQty
}