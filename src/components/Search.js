import { useState, useEffect } from "react";
import * as BooksAPI from "../utils/BooksAPI";

import Bookshelf from "./Bookshelf";

const Search = ({ books, onMove }) => {
  const [allowedSearchTerms, setAllowedSearchTerms] = useState([]);
  const [query, setQuery] = useState([]);
  const [found, setFound] = useState([]);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      setAllowedSearchTerms(BooksAPI.getSearchTerms());
    }

    return (() => {
      unmounted = true;
    })
  }, [])

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      if (query.length !== 0) {
        const search = async () => {
          const res = await BooksAPI.search(query);

          if (!res.error) {
            res.forEach((foundBook, key) => {
              const foundBookInCatalog = books.find((existingBook) => existingBook.id === foundBook.id);
              
              if (foundBookInCatalog) {
                res[key] = foundBookInCatalog;
              }
            });
            setFound(res);
          } else {
            setFound([]);
          }
        }

        search();
      } else {
        setFound([]);
      }

    }

    return () => {
      unmounted = true;
    }
  }, [query]);

  const resetSearch = () => {
    setQuery('');
  }

  return (
    <div className="row">
      <h2 className="mt-3"><i className="bi bi-bookmark-plus"></i> Add Books</h2>

      <div className="input-group input-group-lg mt-3">
        <span className="input-group-text bg-transparent"><i className="bi bi-search"></i></span>
        <input
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="form-control border-start-0"
          list="datalistOptions"
          type="search"
          placeholder="Search full catalog..."
          aria-label="Search"
          value={query}
        />
        <button className="btn btn-dark" type="button" onClick={resetSearch}>Reset</button>
      </div>
      <datalist id="datalistOptions">
        {allowedSearchTerms.map((s, index) => (
          <option key={index} value={s} />
        ))}
      </datalist>
      <hr className="mt-3" />

      <Bookshelf books={found} onMove={onMove} />
    </div>
  )
}

export default Search;