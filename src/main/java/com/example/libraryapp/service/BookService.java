package com.example.libraryapp.service;

import com.example.libraryapp.model.Book;
import com.example.libraryapp.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository repository;

    public BookService(BookRepository repository) {
        this.repository = repository;
    }

    // Add a book
    public Book addBook(Book book) {
        return repository.save(book);
    }

    // Get all books
    public List<Book> getAllBooks() {
        return repository.findAll();
    }

    // Update a book
    public Book updateBook(Long id, Book updatedBook) {
        Book existingBook = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        existingBook.setBookName(updatedBook.getBookName());
        existingBook.setAuthor(updatedBook.getAuthor());
        existingBook.setCategory(updatedBook.getCategory());
        existingBook.setPages(updatedBook.getPages());
        existingBook.setGenre(updatedBook.getGenre());

        return repository.save(existingBook);
    }

    // Delete a book
    public String deleteBook(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Book not found");
        }
        repository.deleteById(id);
        return "Book deleted successfully";
    }

    // Search by name
    public List<Book> searchByName(String name) {
        return repository.findByBookNameContainingIgnoreCase(name);
    }

    // Search by category
    public List<Book> searchByCategory(String category) {
        return repository.findByCategoryContainingIgnoreCase(category);
    }

    // Search by genre
    public List<Book> searchByGenre(String genre) {
        return repository.findByGenreContainingIgnoreCase(genre);
    }
}
