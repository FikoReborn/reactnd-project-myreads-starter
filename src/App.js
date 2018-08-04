import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchPage from './SearchPage'
import ListBooks from './ListBooks'
import sortBy from 'sort-by'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    results: []
  }
  componentDidMount() {
    this.getBooks()
  }

  getBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }
  moveShelf(book, shelf, allBooks) {
    BooksAPI.update(book, shelf).then(() => {
      const newBooksData = allBooks;
      const bookIndex = newBooksData.indexOf(book);
      newBooksData[bookIndex].shelf = shelf;
      this.setState({ books: newBooksData })
      this.getBooks()
    })
  }

  checkShelf(bookResults) {
    bookResults.forEach(thisBook => {
      this.state.books.forEach(storedBook => {
        if (thisBook.id === storedBook.id) {
          thisBook.shelf = storedBook.shelf;
        }
      })
      if (!thisBook.shelf) {
        thisBook.shelf = 'none'
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            onMoveShelf={(book, shelf) => this.moveShelf(book, shelf)}
            books={this.state.books}
          />
        )} />
        <Route path="/search" render={({ location }) => (
          <SearchPage
            books={this.state.books}
            results={this.state.results}
            checkShelf={(book) => this.checkShelf(book)}
            onSearch={(query) => this.searchBooks(query)}
            onMoveShelf={(book, shelf, allBooks) => this.moveShelf(book, shelf, allBooks)}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
