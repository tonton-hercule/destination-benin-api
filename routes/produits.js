const router = require("express").Router()
const produits = require("../controllers/Produits")

router.get("/", produits.findAll)

router.post("/", produits.create)

router.get("/:id", produits.findOne)

router.put("/:id", produits.update)

router.delete("/:id", produits.destroy)

module.exports = router