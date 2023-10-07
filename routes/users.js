const router = require("express").Router()
const UsersController = require("../controllers/Users")
const { verifyToken } = require("./verifyToken")

router.get("/", verifyToken , UsersController.findAll)

module.exports = router