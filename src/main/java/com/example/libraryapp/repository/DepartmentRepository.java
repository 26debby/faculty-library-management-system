package com.example.libraryapp.repository;

import com.example.libraryapp.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}