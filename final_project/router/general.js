const express = require('express');
let books = require("./booksdb.js").books;
let getBookByIsbn = require("./booksdb.js").getBookByIsbn;
let getBookByAuthor = require("./booksdb.js").getBookByAuthor;
let getBookByTitle = require("./booksdb.js").getBookByTitle;
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const {username, password} = req.body

  const userAlreadyExists = users.find(user => user.username === username)

  if (!username || !password) {
    return res.status(400).json({message: 'username/password are not provided.'})
  }

  if (userAlreadyExists) {
    return res.status(409).json({message: 'user already exists'})
  }

  users.push({username,password})

  return res.status(200).json({message: 'user created successfully.'});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  const getBooksResponse = await books

  return res.status(200).json({books: getBooksResponse});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  const bookNumber = req.params.isbn

  const book = await getBookByIsbn(bookNumber)

  if (book) {
    return res.status(200).json({book});
  }

  return res.status(404).json({message: 'isbn not found'});
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  const author = req.params.author

  const bookByAuthor = await getBookByAuthor(author)

  if (bookByAuthor) {
    return res.status(200).json({book: bookByAuthor});
  }
  return res.status(404).json({message: 'author not found'});
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title

    const bookByTitle = await getBookByTitle(title)
  
    if (bookByTitle) {
      return res.status(200).json({book: bookByTitle});
    }
    return res.status(404).json({message: 'title not found'});
  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn

  const bookReview = books[isbn]?.reviews

  if (bookReview) {
      return res.status(200).json({reviews: bookReview});
  }

  return res.status(404).json({message: "book not found"});

});

module.exports.general = public_users;
