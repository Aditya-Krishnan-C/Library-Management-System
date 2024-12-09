const Book = require("../model/book");
const { dbHelper } = require("../helper");

module.exports = {
  getAll: async (next) => {
    try {
      const books = await dbHelper.findAll(Book, {}, {}, next);
      const plainBooks = books.map((book) => book.toObject());
      return plainBooks;
    } catch (e) {
      console.log(e.toString());
      next(e);
    }
  },
  addBook: async (body, next) => {
    try {
      const book = await dbHelper.create(Book, body, next);
      return book;
    } catch (err) {
      console.error("Error creating book:", err);
      throw new Error("Error creating book");
    }
  },
  deleteBook: async (bookId, next) => {
    try {
      const book = await Book.findOneAndDelete({ id: bookId });

      if (!book) {
        throw new Error("Book not found");
      }
      return book;
    } catch (err) {
      console.error("Error deleting book:", err);
      next(err);
    }
  },
  getBookById: async (bookId) => {
    try {
      const book = await Book.findOne({ id: bookId });

      if (!book) {
        throw new Error("No book found with the provided ID");
      }

      return book.toObject();
    } catch (err) {
      console.error("Error fetching book by ID:", err.message);
      throw new Error("Could not fetch book by ID");
    }
  },
  updateBook: async (bookId, updateData) => {
    try {
      const updatedBook = await Book.findOneAndUpdate(
        { id: bookId },
        { $set: updateData },
        { new: true }
      );

      if (!updatedBook) {
        throw new Error("Book not found");
      }
      return updatedBook;
    } catch (err) {
      console.error("Error updating book:", err);
      throw err;
    }
  },
};
