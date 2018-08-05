import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchPage from './SearchPage'
import ListBooks from './ListBooks'
import sortBy from 'sort-by'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    // Get books on mounting
    this.getBooks()
  }

  getBooks() {
    BooksAPI.getAll().then(books => {
      books.sort(sortBy('title'))
      this.setState({ books })
    })
  }
  moveShelf(book, shelf, allBooks) {
    BooksAPI.update(book, shelf).then(() => {
      // Set shelf then update state, and finally get books
      const newBooksData = allBooks;
      const bookIndex = newBooksData.indexOf(book);
      newBooksData[bookIndex].shelf = shelf;
      this.setState({ books: newBooksData })
      this.getBooks()
    })
  }

  checkShelf(bookResults) {
    // Check and update shelves on search
    bookResults.forEach(thisBook => {
      this.state.books.forEach(storedBook => {
        if (thisBook.id === storedBook.id) {
          thisBook.shelf = storedBook.shelf;
        } else if (!thisBook.shelf) {
          thisBook.shelf = 'none'
        }
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            onMoveShelf={(book, shelf, allBooks) => this.moveShelf(book, shelf, allBooks)}
            books={this.state.books}
          />
        )} />
        <Route path="/search" render={({ location }) => (
          <SearchPage
            checkShelf={(book) => this.checkShelf(book)}
            onMoveShelf={(book, shelf, allBooks) => this.moveShelf(book, shelf, allBooks)}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
