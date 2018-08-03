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
    BooksAPI.getAll().then(books => {
      books.sort(sortBy('authors'))
      this.setState({ books })
    })
  }
  moveShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then(books => {
        books.sort(sortBy('authors'))
        this.setState({ books: books, results: books })
      })
    })
  }
  searchBooks(query) {
    if (query.replace(/\s/g, "") !== "") {
      const searchQuery = query.trim();
      BooksAPI.search(searchQuery).then(result => {
        if (!result.error) {
          this.checkShelf(result)
          result.sort(sortBy('authors'))
          this.setState({ results: result })
        } else {
          this.setState({results: []})
        }
      })
    } else {
      this.setState({ results: [] })
    }
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
            onSearch={(query) => this.searchBooks(query)}
            onMoveShelf={(book, shelf) => this.moveShelf(book, shelf)}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
