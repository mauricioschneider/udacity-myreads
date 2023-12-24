
import '../css/App.css';
import { useState, useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

import Bookshelf from './Bookshelf';
import Search from './Search';
import Error404 from './Error404';

import * as BooksAPI from '../utils/BooksAPI';

function App() {
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  const location = useLocation();

  const shelves = {
    "currentlyReading": {
      state: currentlyReading,
      setter: setCurrentlyReading
    },
    "wantToRead": {
      state: wantToRead,
      setter: setWantToRead
    },
    "read": {
      state: read,
      setter: setRead
    }
  }

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      const getBooks = async () => {
        const books = await BooksAPI.getAll();
        setAllBooks(books);
        sortBooks(books);
      }

      getBooks();
    }
    return () => {
      unmounted = true;
    }
  }, []);

  const sortBooks = (books) => {
    for (const book of books) {
      shelves[book.shelf].setter((prev) => [...prev, book]);
    }
  }

  const handleBookshelfChange = async (book, shelf) => {
    const res = await BooksAPI.update(book, shelf);

    const oldShelf = book.shelf;
    book.shelf = shelf;

    // Adds book to new shelf
    shelves[shelf].setter((prev) => [...prev, book]);

    // Removes book from old shelf
    if (oldShelf) {
      shelves[oldShelf].setter((prev) => prev.filter((b) => b.id !== book.id));
    } else {
      // If old shelf wasn't set, it's a new book being added
      // In which case, should be added to allBooks for tracking
      setAllBooks((prev) => [...prev, book])
    }
  }
  return (
    <div data-bs-theme="dark" className="App">
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/"><i className="bi bi-book-half"></i> MyReads</Link>
            <div className="d-flex justify-content-end">
              {location.pathname === "/" &&
                <Link
                  to="/search"
                  className="btn btn-light text-nowrap"
                  type="submit"
                >
                  <i className="bi bi-journal-plus m-1"></i>
                  Add Book
                </Link>
              }
              {location.pathname === "/search" &&
                <Link
                  to="/"
                  className="btn btn-light text-nowrap"
                  type="submit"
                >
                  <i className="bi bi-caret-left m-1"></i>
                  Back to Collections
                </Link>
              }
            </div>
          </div>
        </nav>
      </header>
      <div className="container" data-bs-theme="light" >
        <Routes>
          <Route exact path="/" element={
            <div>
              <h2 className="mt-3"><i className="bi bi-bookmarks"></i> Currently Reading</h2>
              <hr />
              <Bookshelf books={currentlyReading} onMove={handleBookshelfChange} />
              <h2 className="mt-3"><i className="bi bi-bookmark-heart"></i> Want to Read</h2>
              <hr />
              <Bookshelf books={wantToRead} onMove={handleBookshelfChange} />
              <h2 className="mt-3"><i className="bi bi-bookmark-check"></i> Read</h2>
              <hr />
              <Bookshelf books={read} onMove={handleBookshelfChange} />
            </div>
          } />
          <Route path="/search" element={
            <Search books={allBooks} onMove={handleBookshelfChange} />
          } />
          <Route path="*" element={
            <Error404 />
          } />
        </Routes>

      </div>
    </div>
  );
}

export default App;
