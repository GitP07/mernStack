const mongoose = require("mongoose");
const schema = mongoose.Schema;

const BooksSchema = new schema({
    book_name: String,
    author_name: String
})

module.exports = mongoose.model('booksModel', BooksSchema, 'booksList');