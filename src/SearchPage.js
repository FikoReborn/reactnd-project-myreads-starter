import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import './App.css'

class SearchPage extends React.Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    onMoveShelf: PropTypes.func.isRequired
  }
  state = {
    results: []
  }
  componentWillUnmount() {
    this.setState({ results: [] })
  }

  handleQuery(query) {
    if (query.replace(/\s/g, "") !== "") {
      const searchQuery = query.trim();
      BooksAPI.search(searchQuery).then(result => {
        if (!result.error) {
          this.props.checkShelf(result)
          this.setState({ results: result })
        } else {
          this.setState({ results: [] })
        }
      })
    } else {
      this.setState({ results: [] })
    }
  }
  
  render() {
    const results = this.state.results;
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
            <input type="text" placeholder="Search by title or author" onChange={(e) => this.handleQuery(e.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.map((result) => (
              <li key={result.id}>
                <div className="book">
                  <div className="book-top">
                    {result.imageLinks && (
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${result.imageLinks.thumbnail}` }}></div>
                    )}
                    <div className="book-shelf-changer">
                      <select value={result.shelf} onChange={(event) => this.props.onMoveShelf(result, event.target.value, this.state.results)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{result.title}</div>
                  {result.authors && (
                    <div className="book-authors">{result.authors}</div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage