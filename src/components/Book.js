const Book = ({ book, onMove }) => {

  const handleMove = (e) => {
    e.preventDefault();
    const bookshelf = e.target.name;
    onMove(book, bookshelf);
  }

  const selected = (shelf) => {
    return book.shelf === shelf;
  }

  return (
    <div key={book.id} className="col">
      <div className="card shadow-sm h-100">
        <img className="bd-placeholder-img card-img-top" style={{ 'height': '200px', 'width': '100%', 'overflow': 'hidden' }} src={book.imageLinks?.thumbnail} />
        <div className="card-body">
          <div className="card-text">
            <h6 className="card-title">{book.title}</h6>
            <small className="text-body-secondary">{book.authors}</small>
          </div>
        </div>
        <div className="card-footer">
          <div className="mt-1 d-flex justify-content-between align-items-center">
            <div className="btn-group btn-group-sm" role="group" aria-label="Button group with nested dropdown">
              <button type="button" className="btn btn-outline-secondary">View</button>
              <div className="btn-group btn-group-sm" role="group">
                <button type="button" className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  Move
                </button>
                <ul className="dropdown-menu">
                  <h6 className="dropdown-header">Move to...</h6>
                  {(book.shelf === undefined) &&
                    <li>
                      <a
                        className="dropdown-item disabled"
                        onClick={handleMove}
                        href="#"
                        name="read"
                      >
                        <i className="bi bi-check"></i>
                        None
                      </a>
                    </li>
                  }
                  <li>
                    <a
                      className={`dropdown-item ${selected("currentlyReading") ? "disabled" : ""}`}
                      onClick={handleMove}
                      href="#"
                      name="currentlyReading"
                    >
                      {(selected("currentlyReading")) && <i className="bi bi-check"></i>}
                      Currently Reading
                    </a>
                  </li>
                  <li>
                    <a
                      className={`dropdown-item ${selected("wantToRead") ? "disabled" : ""}`}
                      onClick={handleMove}
                      href="#"
                      name="wantToRead"
                    >
                      {(selected("wantToRead")) && <i className="bi bi-check"></i>}
                      Want to Read
                    </a>
                  </li>
                  <li>
                    <a
                      className={`dropdown-item ${selected("read") ? "disabled" : ""}`}
                      onClick={handleMove}
                      href="#"
                      name="read"
                    >
                      {(selected("read")) && <i className="bi bi-check"></i>}
                      Read
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;