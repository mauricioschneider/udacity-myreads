const Book = ({ book }) => {

  return (
    <div key={book.id} className="col">
      <div className="card shadow-sm h-100">
        <img className="bd-placeholder-img card-img-top" style={{ 'height': '200px', 'width': '100%', 'overflow': 'hidden' }} src={book.imageLinks.thumbnail} />
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
                  Dropdown
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                  <li><a className="dropdown-item" href="#">Dropdown link</a></li>
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