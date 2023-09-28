const express = require("express");
const app  = express();
const cors = require('cors')

const mongoose = require("mongoose");
const db_url = "mongodb+srv://priyesh7:7hCap9yPo88qiC7O@cluster0.6jnltjp.mongodb.net/BooksList?retryWrites=true&w=majority"
const bodyParser = require("body-parser");

const bookSchema = require("./bookSchema");
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

mongoose
.connect(db_url,connectionParams)
.then(()=>{
    console.log("connection sucessful");
})
.catch((err)=>{
    console.log("connection failed"+err);
})

app.use(bodyParser.json());
app.use(cors());


//Display all books data
app.get("/", async function(req,res){
    const response = await bookSchema.find().sort({unique_id:1});
    console.log(response[0]);
    res.json(response);

})
app.get("/getBookById/:id" , async function(req,res){
    const bookId = req.params.id;
    const bookList = await bookSchema.findOne({unique_id:bookId});
    bookList != null ? res.json(bookList) : res.json({message: `Book With Id: ${bookId} Is Not Available`});
})

//get book by name
app.get("/getBookByName/:title", async function(req,res){
    const enterName = req.params.title;
    const booksList = await bookSchema.findOne({book_name:enterName});

    (booksList != null) ? res.json(booksList) : res.json({message: "Book Is Not Available"});

})

//Edit book price
app.post("/editBookPrice", async function(req,res){

    const id = req.body.unique_id;
    const newPrice = req.body.price
    const bookList = await bookSchema.find();
    let checkId = false;
    const orgKeys = Object.keys(bookList[0].toObject());
    const userKeys = Object.keys(req.body);
    let tempArr = [];
    

    for (let i = 0; i < bookList.length; i++) {
        let vaildArr = userKeys[i];
        if(orgKeys.indexOf(vaildArr) >= 0){
            tempArr.push(userKeys[i]);
        }   
    }

    if(userKeys.length === tempArr.length){
        for (let i = 0; i < bookList.length; i++) {
            if (id === bookList[i].unique_id) {
                checkId = true;
                break;
            }
       
        }
    
        if(checkId){
            const editPrice = await bookSchema.findOneAndUpdate({unique_id: id},{$set: {price: newPrice}},{new: true})
            res.json(editPrice)
        }
        else{
            res.json({message:"Book ID Not Found"});
        }
    }
    else{
        res.json({message:"Please Enter All Vaild Keys"})
    }
    
    
})


//Api For Updating Book Category 
app.post("/editBookCategory", async function(req,res){

    const id = req.body.unique_id;
    const catg = req.body.category;
    const bookList = await bookSchema.find();
    let checkId = false;
    const orgKeys = Object.keys(bookList[0].toObject());
    const userKeys = Object.keys(req.body);
    let tempArr = [];
    

    for (let i = 0; i < bookList.length; i++) {
        let vaildArr = userKeys[i];
        if(orgKeys.indexOf(vaildArr) >= 0){
            tempArr.push(userKeys[i]);
        }   
    }

    if(userKeys.length === tempArr.length){
        for (let i = 0; i < bookList.length; i++) {
            if (id === bookList[i].unique_id) {
                checkId = true;
                break;
            }
       
        }
        if(checkId){
            newCategory = await bookSchema.findOneAndUpdate({unique_id: id},{$set: {category: catg}},{new:true});
            res.json(newCategory);
        }
        else{
            res.json({message:"Book Id Not Found"})
        }
    }
    else{
        res.json({message:"Please Enter All Valid Keys"})
    }


 })


// Api For Updating Book Author Name
app.post("/editBookAuthor", async function(req,res){

    const id = req.body.unique_id;
    const authorName = req.body.author_name;
    const bookList = await bookSchema.find();
    let checkId = false;
    const orgKeys = Object.keys(bookList[0].toObject());
    const userKeys = Object.keys(req.body);
    let tempArr = [];
    

    for (let i = 0; i < bookList.length; i++) {
        let vaildArr = userKeys[i];
        if(orgKeys.indexOf(vaildArr) >= 0){
            tempArr.push(userKeys[i]);
        }   
    }

    if(userKeys.length === tempArr.length){
        for (let i = 0; i < bookList.length; i++) {
            if (id === bookList[i].unique_id) {
                checkId = true;
                break;
            }
       
        }
        if(checkId){
            const newAuthor = await bookSchema.findOneAndUpdate({unique_id: id},{$set: {author_name: authorName}},{new: true});
            res.json(newAuthor);
        }
        else{
            res.json({message:"Book Id Not Found"});
        }
    }
    else{
        res.json({message:"Please Enter All Valid Keys"});
    }

})


//Api to get all Book Category
app.get("/getCategory", async function(req,res){

    const allCategory = await bookSchema.find({},'category');
    
    if(allCategory.length > 0){
        res.json(allCategory);
    }
    else{
        res.json({message:"There Are No Category Available"})
    }

})


//Api to add new book in the booklist
app.post("/addBook", async function(req,res){
    const id = req.body.unique_id;
    const bookList = await bookSchema.find();
    let checkId = true;
    const orgKeys = Object.keys(bookList[0].toObject());
    const userKeys = Object.keys(req.body);
    let tempArr = [];
    

    for (let i = 0; i < bookList.length; i++) {
        let vaildArr = userKeys[i];
        if(orgKeys.indexOf(vaildArr) >= 0){
            tempArr.push(userKeys[i]);
        }   
    }

    if(userKeys.length === tempArr.length){
        for (let i = 0; i < bookList.length; i++) {
            if (id == bookList[i].unique_id) {
                checkId = false;
                break;
            }

        }


        if(checkId){
            if(req.body.unique_id != 0 ){
                const newBook = new bookSchema(req.body);
                await newBook.save();
                const updatedBooksList = await bookSchema.find().sort({unique_id:1});
                res.json({message:"updated Books List " , Books: updatedBooksList});
            }
            else{
                res.json({message: "Book ID Cannot Be 0"})
            }
        }
        else{
            res.json({message:"Book ID alresdy exist please change Book ID" });
        }
    }
    else{
        res.json({message:"Please Enter All Valid Keys"});
    }
            
})


//Api to delete book with Book id 
app.post("/deleteBook", async function(req,res){

    const id = req.body.unique_id;
    const bookList = await bookSchema.find();
    let checkId = false;
    const orgKeys = Object.keys(bookList[0].toObject());
    const userKeys = Object.keys(req.body);
    let tempArr = [];
    

    for (let i = 0; i < bookList.length; i++) {
        let vaildArr = userKeys[i];
        if(orgKeys.indexOf(vaildArr) >= 0){
            tempArr.push(userKeys[i]);
        }   
    }

    if(userKeys.length === tempArr.length){
        for (let i = 0; i < bookList.length; i++) {
            if (id === bookList[i].unique_id) {
                checkId = true;
                break;
            }
       
        }
        if(checkId){
            await bookSchema.findOneAndDelete({unique_id:id});
            const bookList = await bookSchema.find();
            return res.json({message:"Book Deleted Sucessfuly", books: bookList})
        }
        else{
            res.json({message:"Book Id Not Found"})
        }
    }
    else{
        res.json({message:"Please Enter All Valid Keys"})
    }

    

})

app.listen(8080);

