const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{
    let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
      });
      if(validusers.length > 0){
        return true;
      } else {
        return false;
      }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const {username, password} = req.body

  if (!username || !password ) {
    return res.status(404).json({message: 'username/password cannot be empty.'})
  }

  if (authenticatedUser(username, password)) {
    const accessToken = jwt.sign({data: password}, 'access', {expiresIn: 60*60})

    req.session.authorization = {accessToken, username}

    return res.status(200).json({accessToken, username})
  }
  return res.status(400).json({message: "invalid username/password"});
});

regd_users.put("/auth/review/:isbn", (req, res) => {
  const { username } = req.session.authorization
  const {isbn} = req.params
  const { review } = req.body

  if (!username) {
    return res.status(200).json({message: 'user not logged in.'})
  }

  const userReviewExists = Object.keys(books[isbn].reviews).find(key => key === username)

  books[isbn].reviews[username] = review

  return res.status(200).json(books[isbn]);
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params
    const { username } = req.session.authorization

    delete books[isbn].reviews[username]

    return res.status(200).json({message: 'review deleted successfully.'})
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.authenticatedUser = authenticatedUser;
