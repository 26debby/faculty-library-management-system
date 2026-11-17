package com.example.libraryapp.repository;

import com.example.libraryapp.model.Borrower;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BorrowerRepository extends JpaRepository<Borrower, Long> {
    boolean existsByDepartment_Id(Long departmentId);
}
