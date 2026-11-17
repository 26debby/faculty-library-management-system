package com.example.libraryapp.repository;

import com.example.libraryapp.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByBookNameContainingIgnoreCase(String bookName);

    List<Book> findByCategoryContainingIgnoreCase(String category);

    List<Book> findByGenreContainingIgnoreCase(String genre);
}
