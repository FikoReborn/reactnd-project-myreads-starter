import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import './App.css'

class ListBooks extends React.Component {
    render() {
        const books = this.props.books
        const shelves = [
            {
                id: 'currentlyReading',
                name: 'Currently Reading'
            },
            {
                id: 'wantToRead',
                name: 'Want to Read'
            },
            {
                id: 'read',
                name: 'Read'
            }
        ]
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map((shelf) => (
                            <div className="bookshelf" key={shelf.id}>
                                <h2 className="bookshelf-title">{shelf.name}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {books.filter(book => book.shelf === shelf.id).map((book) => (
                                            <Book
                                                key={book.id}
                                                book={book}
                                                books={books}
                                                onMoveShelf={(book, shelf, allBooks) => this.props.onMoveShelf(book, shelf, allBooks)}
                                            />
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks