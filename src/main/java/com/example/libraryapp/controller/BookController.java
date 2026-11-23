package com.example.libraryapp.controller;

import com.example.libraryapp.model.Book;
import com.example.libraryapp.service.BookService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "https://faculty-library-management-system-8.vercel.app" })

@RequestMapping("/api/books")
public class BookController {

    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    // Add book
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return service.addBook(book);
    }

    // Get all books
    @GetMapping
    public List<Book> getAllBooks() {
        return service.getAllBooks();
    }

    // Update book
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        return service.updateBook(id, book);
    }

    // Delete book
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id) {
        return service.deleteBook(id);
    }

    // Search by name
    @GetMapping("/name/{name}")
    public List<Book> searchByName(@PathVariable String name) {
        return service.searchByName(name);
    }

    // Search by category
    @GetMapping("/category/{category}")
    public List<Book> searchByCategory(@PathVariable String category) {
        return service.searchByCategory(category);
    }

    // Search by genre
    @GetMapping("/genre/{genre}")
    public List<Book> searchByGenre(@PathVariable String genre) {
        return service.searchByGenre(genre);
    }
}
