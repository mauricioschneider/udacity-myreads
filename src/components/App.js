
import '../css/App.css';

function App() {
  return (
    <div data-bs-theme="dark" className="App">
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Offcanvas navbar large">
          <div class="container-fluid">
            <a class="navbar-brand" href="#"><i class="bi bi-book-half"></i> MyReads</a>
            <div class="d-flex justify-content-end flex-grow-1 pe-3">
              <input class="form form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-light text-nowrap" type="submit"><i class="bi bi-journal-plus"></i> Add Book</button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default App;
