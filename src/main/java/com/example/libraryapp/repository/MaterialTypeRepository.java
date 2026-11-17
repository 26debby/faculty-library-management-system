package com.example.libraryapp.repository;

import com.example.libraryapp.model.MaterialType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialTypeRepository extends JpaRepository<MaterialType, Long> {
}