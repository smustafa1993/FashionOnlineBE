const router = require("express").Router()
const controller = require("../controllers/ProdController")
const middleware = require("../middleware")

router.post("/", 
    middleware.stripToken,
    middleware.verifyToken,
    middleware.checkAdmin,    
    controller.CreateProd)
router.get("/", controller.GetProds)
router.get("/:id", controller.GetProdById)
router.put("/:id", 
    middleware.stripToken,
    middleware.verifyToken,
    middleware.checkAdmin,
    controller.UpdateProd)

router.delete("/:id", 
    middleware.stripToken,
    middleware.verifyToken,
    middleware.checkAdmin,    
    controller.DeleteProd)

module.exports = router