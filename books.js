let express = require("express");
let app  = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json())

var listBooks = [{"book_name":"The Alchemist","author_name":"Paulo Coelho","unique_id":1,"category":"Fiction","price":200},{"book_name":"Yellowface","author_name":"R. F. Kuang","unique_id":2,"category":"Fiction","price":180},{"book_name":"Dracula","author_name":"Bram Stoker","unique_id":3,"category":"Horror","price":350},{"book_name":"House of Leaves","author_name":"Mark Z. Danielewski","unique_id":4,"category":"Horror","price":250},{"book_name":"Ring","author_name":"Koji Suzuki","unique_id":5,"category":"Horror","price":150},{"book_name":"Bossypants","author_name":"Tina Fey","unique_id":6,"category":"Funny","price":120},{"book_name":"Bridget Jones's Diary","author_name":"Helen Fielding","unique_id":7,"category":"Funny","price":300},{"book_name":"The Silent Patient","author_name":"Alex Michaelides","unique_id":8,"category":"Thriller","price":400},{"book_name":"Gone Girl","author_name":"Gillian Flynn","unique_id":9,"category":"Mystery","price":400},{"book_name":"The Girl with the Dragon Tattoo","author_name":"Stieg Larsson","unique_id":10,"category":"Mystery","price":400}];

app.get("/", function(req,res){

    var allbook = "";

    for(var i = 0; i < listBooks.length; i++){

        allbook = allbook +"<br></br>" + "Unique ID: " + listBooks[i].unique_id + "<br></br>"
        +"Book Name: " +listBooks[i].book_name + "<br></br>" 
        + "Author Name: " + listBooks[i].author_name + "<br></br>" 
        + "Category: " + listBooks[i].category + "<br></br>" 
        + "Price: " + listBooks[i].price +"<br></br>";  
           
    }
    res.send(allbook); 

})

app.get("/:title", function(req,res){
    let bookname = req.params.title;
    let val = "";
    for(var i = 0; i < listBooks.length; i++){
        console.log(listBooks[i].book_name.indexOf(bookname));
        if(listBooks[i].book_name.indexOf(bookname) >= 0  ){
           
            val = val + "<br></br>" + "Unique ID: " +listBooks[i].unique_id + "<br></br>"
            + "Book Name: " + listBooks[i].book_name + "<br></br>" 
            + "Author Name:" + listBooks[i].author_name + "<br></br>"
            + "Category: " +listBooks[i].category + "<br></br>"
            + "Price: " +listBooks[i].price;
        }
    }
    res.send(val);

})


app.post("/editBookPrice",function(req,res){
    const id = req.body.unique_id;

    for (let i = 0; i < listBooks.length; i++) {
        if(listBooks[i].unique_id == id){
            console.log(listBooks[i].book_name);
            listBooks[i].price = req.body.price;
            res.send(JSON.stringify(listBooks[i]));
            return;
        }
        
    }
    res.send(" This id does not exist");
    
})

//Api For Updating Book Category 
app.post("/editBookCategory", function(req,res){
    const id = req.body.unique_id

    for(let i = 0; i < listBooks.length; i++){
        if(listBooks[i].unique_id == id ){
            listBooks[i].category = req.body.category;
            res.send(JSON.stringify(listBooks[i]));
            return;
        }
    }
    res.send("This id does not exist");
})

// Api For Updating Book Author Name
app.post("/editBookAuthor", function(req,res){
    const id = req.body.unique_id;
    for (let i = 0; i < listBooks.length; i++) {
        if(listBooks[i].unique_id == id){
            listBooks[i].author_name = req.body.author_name;
            res.send(JSON.stringify(listBooks[i]));
            return;
        }
        
    }
    res.send("This id does not exist")
})
app.listen(8080);