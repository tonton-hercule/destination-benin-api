const router = require("express").Router()
const categories = require("../controllers/Categories")

router.get("/", categories.findAll)

router.post("/", categories.create)

router.get("/:id", categories.findOne)

router.put("/:id", categories.update)

router.delete("/:id", categories.destroy)

module.exports = router