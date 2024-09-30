const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")


router.post("/addUser",userController.createUser);

module.exports = router