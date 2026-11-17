package com.example.libraryapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity //rep a table in d database
@Table(name = "books") //tells JPA d name of d table
@Data //generates getters and setters
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookName;
    private String author;
    private String category;
    private int pages;
    private String genre;
}
