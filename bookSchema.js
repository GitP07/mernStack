
const mongoose= require("mongoose");
const schema = mongoose.Schema;

const BooksSchema = new schema({
    book_name: String,
    author_name: String,
    unique_id: Number,
    category: String,
    price: Number
   
})

module.exports = mongoose.model('booksModel', BooksSchema,'Books' )