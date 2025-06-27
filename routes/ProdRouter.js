const router = require("express").Router()
const controller = require("../controllers/ProdController")
const middleware = require("../middleware")

router.post("/", controller.CreateProd)
router.get("/", controller.GetProds)
router.get("/:id", controller.GetProdById)
router.put("/:id", controller.UpdateProd)
router.delete("/:id", controller.DeleteProd)

module.exports = router