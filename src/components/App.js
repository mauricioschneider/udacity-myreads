
import '../css/App.css';
import { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import Bookshelf from './Bookshelf';

import * as BooksAPI from '../utils/BooksAPI';

function App() {
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);

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
      setter:setRead
     }
  }

  useEffect(() => {
    let unmounted = false;

    const getBooks = async () => {
      const books = await BooksAPI.getAll();
      sortBooks(books);
    }

    getBooks();

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
    shelves[oldShelf].setter((prev) => prev.filter((b) => b.id !== book.id));
  }

  return (
    <div data-bs-theme="dark" className="App">
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/"><i className="bi bi-book-half"></i> MyReads</Link>
            <div className="d-flex justify-content-end flex-grow-1 pe-3">
              <input className="form form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-light text-nowrap" type="submit"><i className="bi bi-journal-plus"></i> Add Book</button>
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
              <Bookshelf books={currentlyReading} onMove={handleBookshelfChange}/>
              <h2 className="mt-3"><i className="bi bi-bookmark-heart"></i> Want to Read</h2>
              <hr />
              <Bookshelf books={wantToRead} onMove={handleBookshelfChange}/>
              <h2 className="mt-3"><i className="bi bi-bookmark-check"></i> Read</h2>
              <hr />
              <Bookshelf books={read} onMove={handleBookshelfChange}/>
            </div>
          } />
          <Route path="/search" element={
            <Bookshelf />
          } />
        </Routes>

      </div>
    </div>
  );
}

export default App;
