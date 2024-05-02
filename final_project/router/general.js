const express = require('express');
let books = require("./booksdb.js");
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
public_users.get('/',function (req, res) {
  return res.status(200).json({books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const bookNumber = req.params.isbn

  const book = books[bookNumber]

  return res.status(200).json({book});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author

  const bookKey = Object.keys(books).find(bookKey => books[bookKey].author === author)

  if (bookKey) {
    const book = books[bookKey]
    return res.status(200).json({book});
  }
  return res.status(404).json({message: 'author not found'});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title

    const bookKey = Object.keys(books).find(bookKey => books[bookKey].title === title)
  
    if (bookKey) {
      const book = books[bookKey]
      return res.status(200).json({book});
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
