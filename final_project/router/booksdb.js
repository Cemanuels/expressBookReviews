let books = new Promise((res, rej) => {
      setTimeout(() => {
            res({
                  1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
                  2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
                  3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
                  4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
                  5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
                  6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
                  7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
                  8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
                  9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
                  10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
            })
      }, 3000)
})

let getBookByIsbn = (isbn) => new Promise((res, rej) => {
      setTimeout(() => {
            books.then(response => {
                  res(response[isbn])
            })
      }, 1000)
})

let getBookByAuthor = (author) => new Promise((res, rej) => {
      setTimeout(() => {
            books.then(response => {
                  let bookByAuthorKey = Object.keys(response).find(bookKey => response[bookKey].author === author)
                  if (bookByAuthorKey) {
                    res(response[bookByAuthorKey])
                    return
                  }
                  res(bookByAuthorKey)
            })
      }, 1000)
})

let getBookByTitle = (title) => new Promise((res, rej) => {
      setTimeout(() => {
            books.then(response => {
                  let bookByTitleKey = Object.keys(response).find(bookKey => response[bookKey].title === title)
                  if (bookByTitleKey) {
                        res(response[bookByTitleKey])
                        return
                      }
                      res(bookByTitleKey)
            })
      }, 1000)
})

module.exports.books=books;
module.exports.getBookByIsbn=getBookByIsbn;
module.exports.getBookByAuthor=getBookByAuthor;
module.exports.getBookByTitle=getBookByTitle;
