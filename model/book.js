const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const book = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  published_year: { type: String, required: true },
  genre: { type: String, required: true },
  available_copies: { type: String, required: true },
});

module.exports = mongoose.model("book", book);
