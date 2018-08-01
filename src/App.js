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
    showSearchPage: false
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }
  render() {
    console.log(this.state.books[0])
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage/>
        ) : (
          <ListBooks
            books={this.state.books}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
