const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")


router.post("/addUser",userController.createUser);

router.post("/createBook", userController.createBook);


router.get("/userList", userController.getUsersList);

router.get("/details/:id", userController.getUserDetails)

router.post("/updateUserDetails", userController.updateUserDetails);

router.post("/updateBookDetails", userController.updateBookDetails)

module.exports = router