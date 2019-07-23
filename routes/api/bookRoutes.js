const router = require("express").Router();
const booksController = require("../../controllers/booksController");

//For/api/books
router
  .route("/")
  .get(booksController.findAll)
  .post(booksController.saveBook);

// fot /api/books/:id
router
  .route("/:id")
  .get(booksController.findById)
  .delete(booksController.deleteBook);

module.exports = router;
