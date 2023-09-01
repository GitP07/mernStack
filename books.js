const express = require("express");
const app  = express();
var bodyParser = require('body-parser');

const {MongoClient} = require("mongodb");
const dataBase = "mongodb+srv://priyesh7:PG1ewPrnzZmK8HCa@cluster0.6jnltjp.mongodb.net/?retryWrites=true&w=majority";


app.use(bodyParser.json());

var listBooks = [{"book_name":"The Alchemist","author_name":"Paulo Coelho","unique_id":1,"category":"Fiction","price":200},
{"book_name":"Yellowface","author_name":"R. F. Kuang","unique_id":2,"category":"Fiction","price":180},
{"book_name":"Dracula","author_name":"Bram Stoker","unique_id":3,"category":"Horror","price":350},
{"book_name":"House of Leaves","author_name":"Mark Z. Danielewski","unique_id":4,"category":"Horror","price":250},
{"book_name":"Ring","author_name":"Koji Suzuki","unique_id":5,"category":"Horror","price":150},
{"book_name":"Bossypants","author_name":"Tina Fey","unique_id":6,"category":"Funny","price":120},
{"book_name":"Bridget Jones's Diary","author_name":"Helen Fielding","unique_id":7,"category":"Funny","price":300},
{"book_name":"The Silent Patient","author_name":"Alex Michaelides","unique_id":8,"category":"Thriller","price":400},
{"book_name":"Gone Girl","author_name":"Gillian Flynn","unique_id":9,"category":"Mystery","price":400},
{"book_name":"The Girl with the Dragon Tattoo","author_name":"Stieg Larsson","unique_id":10,"category":"Mystery","price":400}];


let message = {};

app.get("/", async function(req,res){
    const client = new MongoClient(dataBase);

    await client.connect().then(()=>{
        console.log("DataBase Connection Sucessful");
    }).catch((err)=>{
        console.log("DataBase did not Connect");
    });
    res.send(JSON.stringify(listBooks)); 

})

app.get("/getBookByName/:title", function(req,res){
    let bookname = req.params.title;
    message = {err:"This Book Is Not Available In The Books List"};
    for(var i = 0; i < listBooks.length; i++){

        console.log(listBooks[i].book_name.indexOf(bookname));
        if(listBooks[i].book_name.indexOf(bookname) >= 0  ){

            res.send(JSON.stringify(listBooks[i]))
            return
        }
      
    }
    res.send(JSON.stringify(message));

})


app.post("/editBookPrice",function(req,res){
    const id = req.body.unique_id;
    let userArr = Object.keys(req.body);
    let dataArr = Object.keys(listBooks[0]);
    let tempArr = [];

    for (let i = 0; i < dataArr.length; i++) {
        let validKey = userArr[i];
        if(dataArr.indexOf(validKey) >= 0){
            tempArr.push(userArr[i])
        }
        
    }
    
    if(userArr.length === tempArr.length){
        for (let i = 0; i < listBooks.length; i++) {
            if(listBooks[i].unique_id == id){

                console.log(listBooks[i].book_name);
                listBooks[i].price = req.body.price;
                res.send(JSON.stringify(listBooks[i]));
                return;
            }
        
        }
        message = {err:" This id does not exist"};
        res.send(JSON.stringify(message));
    }
    else{
        message = {err:"Please enter all and vaild keys of books"};
        res.send(JSON.stringify(message));
    }
    
})


//Api For Updating Book Category 
app.post("/editBookCategory", function(req,res){
    const id = req.body.unique_id
    let userArr = Object.keys(req.body);
    let dataArr = Object.keys(listBooks[0]);
    let tempArr = [];

    for (let i = 0; i < dataArr.length; i++) {

        let validKey = userArr[i];
        if(dataArr.indexOf(validKey) >= 0){

            tempArr.push(userArr[i])
        }
        
    }
    
    
    if(userArr.length === tempArr.length){
        for(let i = 0; i < listBooks.length; i++){
            if(id != null && listBooks[i].unique_id == id ){

                listBooks[i].category = req.body.category;
                res.send(JSON.stringify(listBooks[i]));
                return;
            }
        }
        message = {err:"This id does not exist"}
        res.send(JSON.stringify(message));
    }
    else{
        message = {err:"Please enter all and vaild keys of books"}
        res.send(JSON.stringify(message));
    }

})


// Api For Updating Book Author Name
app.post("/editBookAuthor", function(req,res){
    const id = req.body.unique_id;
    let userArr = Object.keys(req.body);
    let dataArr = Object.keys(listBooks[0]);
    let tempArr = [];

    for (let i = 0; i < dataArr.length; i++) {
        let validKey = userArr[i];
        if(dataArr.indexOf(validKey) >= 0){
            tempArr.push(userArr[i])
        }
        
    }

    if(userArr.length === tempArr.length){
        for (let i = 0; i < listBooks.length; i++) {
            
            if(id != null && listBooks[i].unique_id == id){
                    
                listBooks[i].author_name = req.body.author_name;
                res.send(JSON.stringify(listBooks[i]));
                return;
            }
                
        }
    message = {err:"This Id Does Not Exist"};
        res.send(JSON.stringify(message))
    }
    else{
        message = {err:"Please Enter All Valid Keys"};
        res.send(JSON.stringify(message));
    } 

})


//Api to get all Book Category
app.get("/getCategory", function(req,res){

    let catArr = [];
    for(let i = 0; i < listBooks.length; i++){
        catArr.push(listBooks[i].category);
    }

    res.send(catArr);
})


//Api to add new book in the booklist
app.post("/addBook", function(req,res){
    let newBook = req.body;
    let userArr = Object.keys(req.body);
    let dataArr = Object.keys(listBooks[0]);
    let tempArr = [];

    for (let i = 0; i < dataArr.length; i++) {
        let validKey = userArr[i];
        if(dataArr.indexOf(validKey) >= 0){
            tempArr.push(userArr[i])
        }
        
    }

    var allbook = "";
    if(userArr.length === tempArr.length){

        for(let i = 0; i < listBooks.length; i++){

            if(newBook.unique_id != null && listBooks[i].unique_id != newBook.unique_id ){
                if(newBook.unique_id == listBooks.length+1){

                    listBooks.push(newBook); 
                    return;
                }
                else{
                    let ID = listBooks.length+1
                    message = {err:"new book id must be: ",id:ID}
                    res.send(JSON.stringify(message));
                    return;
                }

                
            }
            else{
                message = {err:"ID Is Present"};
                res.send(message);
                return
            }
            
        }
        message = {mess:" New Book Added Successfully "};
        res.send(JSON.stringify(message)+JSON.stringify(newBook)+JSON.stringify(listBooks));

    }
    else{
        message = {err:"Please Enter Valid Keys Of Book To Add New Book To The List Of Books"};
        res.send(message);
    }
    
})


//Api to delete book with their id 
app.post("/deleteBook", function(req,res){

    let id = req.body.unique_id;
    let allbook = "";

    if (id <= listBooks.length && id > 0){

        for(let j = 0; j < listBooks.length; j++){
            if(id === listBooks[j].unique_id){
                listBooks.splice(j,1);

            }
               
        }
        res.send(JSON.stringify(listBooks));
    }
    else{
        message = {err:"ID Is Not Available In The Book List"};
        res.send(message);
    }  


})

app.listen(8080);

