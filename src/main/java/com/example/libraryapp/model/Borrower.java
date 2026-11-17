package com.example.libraryapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "borrowers")
public class Borrower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "borrower_number", nullable = false, unique = true)
    private String borrowerNumber;

    @Column(name = "borrower_category", nullable = false)
    private String borrowerCategory;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    private String email;
    private String phone;

    public Borrower() {
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getBorrowerNumber() {
        return borrowerNumber;
    }

    public void setBorrowerNumber(String borrowerNumber) {
        this.borrowerNumber = borrowerNumber;
    }

    public String getBorrowerCategory() {
        return borrowerCategory;
    }

    public void setBorrowerCategory(String borrowerCategory) {
        this.borrowerCategory = borrowerCategory;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}