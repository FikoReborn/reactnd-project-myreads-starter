import React from 'react'
import * as BooksAPI from './BooksAPI'
import SearchPage from './SearchPage'
import ListBooks from './ListBooks'
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
    query: '',
    result: [],
    showSearchPage: false
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }
  moveShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then(books => {
        this.setState({ books })
      })
    })
  }

  searchBooks(query) {
    if (query) {
      this.setState({ query: query.trim() })
      BooksAPI.search(query).then(result => {
        this.setState({ result })
      })
    } else {
      this.setState({ result: [] })
    }
  }
  render() {
    console.log(this.state.books[0])
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage
            result={this.state.result}
            query={this.state.query}
            onMoveShelf={(book, shelf) => this.moveShelf(book, shelf)}
            onSearch={(query) => this.searchBooks(query)}
          />
        ) : (
            <ListBooks
              onMoveShelf={(book, shelf) => this.moveShelf(book, shelf)}
              books={this.state.books}
            />
          )}
      </div>
    )
  }
}

export default BooksApp
