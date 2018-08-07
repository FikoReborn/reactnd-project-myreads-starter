import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Book from './Book'
import './App.css'

class SearchPage extends React.Component {
  static propTypes = {
    checkShelf: PropTypes.func.isRequired,
    onMoveShelf: PropTypes.func.isRequired
  }
  state = {
    results: []
  }

  handleQuery(query) {
    // Run search if no empty string, otherwise clear results to prevent errors
    if (query.replace(/\s/g, "") !== "") {
      const searchQuery = query.trim();
      BooksAPI.search(searchQuery).then(result => {
        // Set book shelves if no error, otherwise clear results to prevent errors
        if (!result.error) {
          this.props.checkShelf(result)
          result.sort(sortBy('title'))
          this.setState({ results: result })
        } else {
          this.setState({ results: [] })
        }
      })
    } else {
      this.setState({ results: [] })
    }
  }

  clearResults(val) {
    // Clear results if search field is empty
    // Prevents issue when backspace is held down to clear query
    if (val === "") {
      this.setState({ results: [] })
    }
  }

  render() {
    const results = this.state.results;
    const { checkShelf, moveShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" placeholder="Search by title or author" onChange={(e) => this.handleQuery(e.target.value)} onKeyDown={(e) => this.clearResults(e.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.map((result) => (
              <Book
                key={result.id}
                book={result}
                books={results}
                moveShelf={moveShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage