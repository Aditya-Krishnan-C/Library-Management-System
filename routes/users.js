var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");
const { autho } = require("../middlewares");

router.get("/login", userController.loginForm);
router.get("/register", userController.signupForm);
router.get("/viewAllUsers", userController.viewAllUsers);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.put("/updateUser/:name", userController.updateUser);
router.delete("/deleteUser/:name", userController.deleteUser);

module.exports = router;
