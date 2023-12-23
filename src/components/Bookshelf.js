import Book from './Book';

const Bookshelf = ({ books, onMove }) => {
  const emptyShelf = (!books || books.length === 0);
  if (emptyShelf) {
    return (
      <div className="px-4 py-5 my-5 text-center">
        <i className="bi bi-bookshelf" style={{ 'fontSize': '3em' }}></i>
        <h4>No books in this collection</h4>
      </div>
    );
  } else {
  return (
    <div className="row row-cols-3 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-2">
      {books.map((book) => (
        <Book key={book.id} book={book} onMove={ onMove }/>
      ))}
    </div>
  )}

}

export default Bookshelf;