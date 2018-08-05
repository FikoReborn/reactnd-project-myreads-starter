import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import './App.css'

class ListBooks extends React.Component {
    state = {
        reading: true,
        currentlyReading: true,
        wantToRead: true,
        read: true
    }

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
                            <BookShelf
                                key={shelf.id}
                                shelf={shelf}
                                books={books}
                                onMoveShelf={(book, shelf, allBooks) => this.props.onMoveShelf(book, shelf, allBooks)}
                            />
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