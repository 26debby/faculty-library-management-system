
package com.example.libraryapp.repository;

import com.example.libraryapp.model.MaterialCopy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialCopyRepository extends JpaRepository<MaterialCopy, Long> {

    boolean existsByMaterial_Id(Long materialId);
}
