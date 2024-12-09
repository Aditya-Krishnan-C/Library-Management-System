const { bookService } = require("../services");

module.exports = {
  showAll: async (req, res, next) => {
    try {
      const plainBooks = await bookService.getAll(next);
      return res.render("pages/books", { books: plainBooks });
    } catch (err) {
      console.error("Error fetching books:", err);
      return res
        .status(500)
        .json({ message: "Error fetching books", error: err });
    }
  },
  formAddBook: function (req, res, next) {
    res.render("form/add-book");
  },

  addBook: async (req, res, next) => {
    try {
      const book = await bookService.addBook(req.body);
      res.status(201).json({ book });
    } catch (err) {
      console.error("Error creating book:", err);
      return res
        .status(500)
        .json({ message: "Error creating book", error: err });
    }
  },

  updateBook: async (req, res) => {
    try {
      const bookId = req.params.id;
      const updatedBook = await bookService.updateBook(bookId, req.body);
      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json(updatedBook);
    } catch (err) {
      console.error("Error updating book:", err);
      return next(err);
    }
  },

  getBookById: async (req, res, next) => {
    try {
      const bookId = req.params.id;
      const book = await bookService.getBookById(bookId, next);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json(book);
    } catch (err) {
      console.error("Error fetching book by ID:", err);
      return next(err);
    }
  },

  deleteBook: async (req, res, next) => {
    try {
      const bookId = req.params.id;
      const deletedBook = await bookService.deleteBook(bookId, next);

      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
      console.error("Error deleting book:", err);
      return next(err);
    }
  },
};
