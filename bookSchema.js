
const mongoose= require("mongoose");
const schema = mongoose.Schema;

const BooksSchema = new schema({
    book_name: String,
    author_name: String,
    unique_id: Number,
    category: String,
    price: Number,
    book_cover: String,
    book_description: String
   
})

module.exports = mongoose.model('booksModel', BooksSchema,'Books' )