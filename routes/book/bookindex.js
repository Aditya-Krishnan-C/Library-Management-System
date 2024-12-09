var express = require("express");
var router = express.Router();
const { bookController } = require("../../controllers");
const Book = require("../../model/book");
const { autho } = require("../../middlewares");

router.get("/", autho.auth, bookController.showAll);
router.post("/", autho.auth, bookController.addBook);
router.get("/:id", autho.auth, bookController.getBookById);
router.put("/:id", autho.auth, bookController.updateBook);
router.delete("/:id", autho.auth, bookController.deleteBook);

module.exports = router;
