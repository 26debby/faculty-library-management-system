
import { deleteBook } from "../services/BookService";

function BookList({ books, loadBooks, setSelectedBook }) {
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBook(id);
      loadBooks();
    } catch (error) {
      console.error(error);
      alert("Failed to delete book");
    }
  }

  return (
    <div className="book-list">
      <h2>Book List</h2>

      <div className="book-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Category</th>
              <th>Pages</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.bookName}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.pages}</td>
                  <td>{book.genre}</td>
                  <td>
                    <div className="book-actions">
                      <button
                        className="edit-button"
                        onClick={() => setSelectedBook(book)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No books found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookList;
