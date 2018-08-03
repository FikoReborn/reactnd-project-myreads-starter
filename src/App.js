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
    results: [],
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
    if (query.replace(/\s/g,"") !== "") {
      const searchQuery = query.trim();
      BooksAPI.search(searchQuery).then(result => {
        if (!result.error) this.setState({ results:result })
        else this.setState({results: []})
      })
    } else {
      this.setState({ results: [] })
    }
  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage
            results={this.state.results}
            onSearch={(query) => this.searchBooks(query)}
            onMoveShelf={(book, shelf) => this.moveShelf(book, shelf)}
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
