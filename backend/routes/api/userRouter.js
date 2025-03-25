const express = require("express");
const UserController = require("../../controllers/userController");

const userRouter = express.Router(); 


userRouter.route("/:email").put(UserController.updateUser);

module.exports = userRouter;