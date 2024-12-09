var express = require("express");
var router = express.Router();
const bookRoute = require("./book/bookindex");
const userRoute = require("./users");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/api/books", bookRoute);
router.use("/api/auth", userRoute);

module.exports = router;
