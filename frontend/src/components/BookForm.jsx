import { useState, useEffect } from "react";
import { addBook, updateBook } from "../services/BookService";

function BookForm({ loadBooks, selectedBook, setSelectedBook }) {
  const [book, setBook] = useState({
    bookName: "",
    author: "",
    category: "",
    pages: "",
    genre: "",
  });

  useEffect(() => {
    if (selectedBook) {
      setBook(selectedBook);
    } else {
      setBook({
        bookName: "",
        author: "",
        category: "",
        pages: "",
        genre: "",
      });
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedBook) {
        await updateBook(selectedBook.id, book);
        alert("Book updated successfully!");
      } else {
        await addBook(book);
        alert("Book added successfully!");
      }

      setBook({
        bookName: "",
        author: "",
        category: "",
        pages: "",
        genre: "",
      });

      setSelectedBook(null);
      loadBooks();
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="bookName"
        placeholder="Book Name"
        value={book.bookName}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="author"
        placeholder="Author"
        value={book.author}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={book.category}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="pages"
        placeholder="Pages"
        value={book.pages}
        onChange={(e) => {
          const value = e.target.value;
          if (
            value === "" ||
            (Number(value) >= 1 && Number.isInteger(Number(value)))
          ) {
            setBook({ ...book, pages: value });
          }
        }}
        min="1"
        step="1"
        required
      />

      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={book.genre}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {selectedBook ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
}

export default BookForm;