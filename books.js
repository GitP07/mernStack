let express = require("express");
let app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
app.use(cors());

const booksSchema = require("./booksSchema");

const db_uri =
  "mongodb+srv://awwtistic:2s6AOqQuT7y7ZD4X@libra-computers.gt2basl.mongodb.net/books-library?retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(db_uri, connectionParams)
  .then(() => {
    console.log(`DB connection success`);
  })
  .catch((err) => {
    console.log(`DB connection failed for ${err}`);
  });

app.use(bodyParser.json());

var listBooks = [
  {
    book_name: "The Alchemist",
    author_name: "Paulo Coelho",
    unique_id: 1,
    category: "Fiction",
    price: 200,
  },
  {
    book_name: "Yellowface",
    author_name: "R. F. Kuang",
    unique_id: 2,
    category: "Fiction",
    price: 180,
  },
  {
    book_name: "Dracula",
    author_name: "Bram Stoker",
    unique_id: 3,
    category: "Horror",
    price: 350,
  },
  {
    book_name: "House of Leaves",
    author_name: "Mark Z. Danielewski",
    unique_id: 4,
    category: "Horror",
    price: 250,
  },
  {
    book_name: "Ring",
    author_name: "Koji Suzuki",
    unique_id: 5,
    category: "Horror",
    price: 150,
  },
  {
    book_name: "Bossypants",
    author_name: "Tina Fey",
    unique_id: 6,
    category: "Funny",
    price: 120,
  },
  {
    book_name: "Bridget Jones's Diary",
    author_name: "Helen Fielding",
    unique_id: 7,
    category: "Funny",
    price: 300,
  },
  {
    book_name: "The Silent Patient",
    author_name: "Alex Michaelides",
    unique_id: 8,
    category: "Thriller",
    price: 400,
  },
  {
    book_name: "Gone Girl",
    author_name: "Gillian Flynn",
    unique_id: 9,
    category: "Mystery",
    price: 400,
  },
  {
    book_name: "The Girl with the Dragon Tattoo",
    author_name: "Stieg Larsson",
    unique_id: 10,
    category: "Mystery",
    price: 400,
  },
];

app.get("/", async function (req, res) {
  var allbook = "";

  const response = await booksSchema.find();
//   console.log(`server response ${JSON.stringify(response)}`);

//   for (var i = 0; i < listBooks.length; i++) {
//     allbook =
//       allbook +
//       "<br></br>" +
//       "Unique ID: " +
//       listBooks[i].unique_id +
//       "<br></br>" +
//       "Book Name: " +
//       listBooks[i].book_name +
//       "<br></br>" +
//       "Author Name: " +
//       listBooks[i].author_name +
//       "<br></br>" +
//       "Category: " +
//       listBooks[i].category +
//       "<br></br>" +
//       "Price: " +
//       listBooks[i].price +
//       "<br></br>";
//   }
//   res.send(allbook);
res.json(response);
});

app.get("/getBookByName/:title", function (req, res) {
  let bookname = req.params.title;
  let val = "";
  for (var i = 0; i < listBooks.length; i++) {
    console.log(listBooks[i].book_name.indexOf(bookname));
    if (listBooks[i].book_name.indexOf(bookname) >= 0) {
      val =
        val +
        "<br></br>" +
        "Unique ID: " +
        listBooks[i].unique_id +
        "<br></br>" +
        "Book Name: " +
        listBooks[i].book_name +
        "<br></br>" +
        "Author Name:" +
        listBooks[i].author_name +
        "<br></br>" +
        "Category: " +
        listBooks[i].category +
        "<br></br>" +
        "Price: " +
        listBooks[i].price;
    } else {
      val = "This Book Is Not Available In The Books List";
    }
  }
  res.send(val);
});

app.post("/editBookPrice", function (req, res) {
  const id = req.body.unique_id;
  let userArr = Object.keys(req.body);
  let dataArr = Object.keys(listBooks[0]);
  let tempArr = [];

  for (let i = 0; i < dataArr.length; i++) {
    let validKey = userArr[i];
    if (dataArr.indexOf(validKey) >= 0) {
      tempArr.push(userArr[i]);
    }
  }

  if (userArr.length === tempArr.length) {
    for (let i = 0; i < listBooks.length; i++) {
      if (listBooks[i].unique_id == id) {
        console.log(listBooks[i].book_name);
        listBooks[i].price = req.body.price;
        res.send(JSON.stringify(listBooks[i]));
        return;
      }
    }
    res.send(" This id does not exist");
  } else {
    res.send("Please enter all and vaild keys of books");
  }
});

//Api For Updating Book Category
app.post("/editBookCategory", function (req, res) {
  const id = req.body.unique_id;
  let userArr = Object.keys(req.body);
  let dataArr = Object.keys(listBooks[0]);
  let tempArr = [];

  for (let i = 0; i < dataArr.length; i++) {
    let validKey = userArr[i];
    if (dataArr.indexOf(validKey) >= 0) {
      tempArr.push(userArr[i]);
    }
  }

  if (userArr.length === tempArr.length) {
    for (let i = 0; i < listBooks.length; i++) {
      if (id != null && listBooks[i].unique_id == id) {
        listBooks[i].category = req.body.category;
        res.send(
          JSON.stringify(listBooks[i]) +
            "<br></br>" +
            "Author name Updated Successfully"
        );
        return;
      }
    }
    res.send("This id does not exist");
  } else {
    res.send("Please enter all and vaild keys of books");
  }
});

// Api For Updating Book Author Name
app.post("/editBookAuthor", function (req, res) {
  const id = req.body.unique_id;
  let userArr = Object.keys(req.body);
  let dataArr = Object.keys(listBooks[0]);
  let tempArr = [];

  for (let i = 0; i < dataArr.length; i++) {
    let validKey = userArr[i];
    if (dataArr.indexOf(validKey) >= 0) {
      tempArr.push(userArr[i]);
    }
  }
  console.log(dataArr);
  console.log(userArr);
  console.log(tempArr);

  if (userArr.length === tempArr.length) {
    for (let i = 0; i < listBooks.length; i++) {
      if (id != null && listBooks[i].unique_id == id) {
        listBooks[i].author_name = req.body.author_name;
        res.send(
          JSON.stringify(listBooks[i]) +
            "<br></br>" +
            "Author name Updated Successfully"
        );
        return;
      }
    }
    res.send("This Id Does Not Exist");
  } else {
    res.send("Please Enter All Valid Keys");
  }
});

//Api to get all Book Category
app.get("/getCategory", function (req, res) {
  let catArr = [];
  for (let i = 0; i < listBooks.length; i++) {
    catArr.push(listBooks[i].category);
  }

  res.send(catArr);
});

//Api to add new book in the booklist
app.post("/addBook", function (req, res) {
  let newBook = req.body;
  let userArr = Object.keys(req.body);
  let dataArr = Object.keys(listBooks[0]);
  let tempArr = [];

  for (let i = 0; i < dataArr.length; i++) {
    let validKey = userArr[i];
    if (dataArr.indexOf(validKey) >= 0) {
      tempArr.push(userArr[i]);
    }
  }

  var allbook = "";
  if (userArr.length === tempArr.length) {
    for (let i = 0; i < listBooks.length; i++) {
      if (
        newBook.unique_id != null &&
        listBooks[i].unique_id != newBook.unique_id
      ) {
        if (newBook.unique_id == listBooks.length + 1) {
          listBooks.push(newBook);

          for (let j = 0; j < listBooks.length; j++) {
            allbook =
              allbook +
              "<br></br>" +
              "Unique ID: " +
              listBooks[j].unique_id +
              "<br></br>" +
              "Book Name: " +
              listBooks[j].book_name +
              "<br></br>" +
              "Author Name: " +
              listBooks[j].author_name +
              "<br></br>" +
              "Category: " +
              listBooks[j].category +
              "<br></br>" +
              "Price: " +
              listBooks[j].price +
              "<br></br>";
          }
          break;
        } else {
          let id = listBooks.length + 1;
          res.send("new book id must be: " + id);
          break;
        }
      } else {
        res.send("id is present");
        break;
      }
    }
    res.send(
      " New Book Added Successfully" +
        "<br></br>" +
        JSON.stringify(newBook) +
        "<br></br>" +
        allbook /*+JSON.stringify(listBooks)*/
    );
  } else {
    res.send(
      "Please Enter Valid Keys Of Book To Add New Book To The List Of Books"
    );
  }
});

//Api to delete book with their id
app.post("/deleteBook", function (req, res) {
  let id = req.body.unique_id;
  let newArr = [];
  let allbook = "";

  if (id <= listBooks.length && id > 0) {
    for (let i = 0; i < listBooks.length; i++) {
      if (id != listBooks[i].unique_id) {
        newArr.push(listBooks[i]);
      }
    }
    for (let j = 0; j < newArr.length; j++) {
      allbook =
        allbook +
        "<br></br>" +
        "Unique ID: " +
        newArr[j].unique_id +
        "<br></br>" +
        "Book Name: " +
        newArr[j].book_name +
        "<br></br>" +
        "Author Name: " +
        newArr[j].author_name +
        "<br></br>" +
        "Category: " +
        newArr[j].category +
        "<br></br>" +
        "Price: " +
        newArr[j].price +
        "<br></br>";
    }
    res.send(
      "List Of Books After Deleting Book With ID:" + id + "<br></br>" + allbook
    );
  } else {
    res.send("ID Is Not Available In The Book List");
  }
});

app.listen(8080);
