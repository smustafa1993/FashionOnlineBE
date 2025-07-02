const router = require("express").Router()
const controller = require("../controllers/CartController")
const middleware = require("../middleware")


router.get("/",  middleware.stripToken,
    middleware.verifyToken,
    controller.GetCart)


router.post("/addtocart",  middleware.stripToken,
    middleware.verifyToken,
    controller.AddToCart)

router.post("/removefromcart",  middleware.stripToken,
    middleware.verifyToken,
    controller.RemoveFromCart)

router.post("/clearcart",  middleware.stripToken,
    middleware.verifyToken,
    controller.ClearCart)

router.post("/increase",  middleware.stripToken,
    middleware.verifyToken,
    controller.IncreaseQty)

router.post("/decrease",  middleware.stripToken,
    middleware.verifyToken,
    controller.DecreaseQty)


module.exports = router