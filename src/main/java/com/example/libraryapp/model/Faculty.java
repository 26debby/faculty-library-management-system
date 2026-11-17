package com.example.libraryapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "faculties")
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "faculty_name", nullable = false, unique = true)
    private String facultyName;

    public Faculty() {
    }

    public Long getId() {
        return id;
    }

    public String getFacultyName() {
        return facultyName;
    }

    public void setFacultyName(String facultyName) {
        this.facultyName = facultyName;
    }
}
