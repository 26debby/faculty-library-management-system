
package com.example.libraryapp.repository;

import com.example.libraryapp.model.Material;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, Long> {
    boolean existsByDepartment_Id(Long departmentId);


    @Query("""
    SELECT m FROM Material m
    LEFT JOIN m.department d
    JOIN m.materialType mt
    WHERE
        (:field = 'all' AND (
            LOWER(m.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(m.author) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(m.isbn) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(m.publisher) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(m.category) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(m.genre) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(d.departmentName) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(mt.typeName) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR CAST(m.id AS string) LIKE CONCAT('%', :keyword, '%')
        ))
        OR (:field = 'title' AND LOWER(m.title) LIKE LOWER(CONCAT('%', :keyword, '%')))
        OR (:field = 'author' AND LOWER(m.author) LIKE LOWER(CONCAT('%', :keyword, '%')))
        OR (:field = 'isbn' AND CAST(m.id AS string) LIKE CONCAT('%', :keyword, '%'))
        OR (:field = 'publisher' AND LOWER(mt.typeName) LIKE LOWER(CONCAT('%', :keyword, '%')))
        OR (:field = 'category' AND LOWER(m.category) LIKE LOWER(CONCAT('%', :keyword, '%')))
        OR (:field = 'genre' AND LOWER(m.genre) LIKE LOWER(CONCAT('%', :keyword, '%')))
        OR (:field = 'department' AND LOWER(d.departmentName) LIKE LOWER(CONCAT('%', :keyword, '%')))
        OR (:field = 'materialType' AND LOWER(mt.typeName) LIKE LOWER(CONCAT('%', :keyword, '%')))
        OR (:field = 'id' AND CAST(m.id AS string) LIKE CONCAT('%', :keyword, '%'))
    """)
    Page<Material> searchMaterials(
            @Param("keyword") String keyword,
            @Param("field") String field,
            Pageable pageable
    );
}
