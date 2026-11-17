
package com.example.libraryapp.service;

import com.example.libraryapp.model.Material;
import com.example.libraryapp.repository.MaterialRepository;
import com.example.libraryapp.repository.MaterialCopyRepository;
import com.example.libraryapp.repository.DepartmentRepository;
import com.example.libraryapp.repository.MaterialTypeRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class MaterialService {

    private final MaterialRepository materialRepository;
    private final MaterialCopyRepository materialCopyRepository;
    private final DepartmentRepository departmentRepository;
    private final MaterialTypeRepository materialTypeRepository;

    public MaterialService(
            MaterialRepository materialRepository,
            MaterialCopyRepository materialCopyRepository,
            DepartmentRepository departmentRepository,
            MaterialTypeRepository materialTypeRepository) {

        this.materialRepository = materialRepository;
        this.materialCopyRepository = materialCopyRepository;
        this.departmentRepository = departmentRepository;
        this.materialTypeRepository = materialTypeRepository;
    }

    public Page<Material> getAllMaterials(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return materialRepository.findAll(pageable);
    }

public Page<Material> searchMaterials(
        String keyword,
        String field,
        int page,
        int size) {

    Pageable pageable = PageRequest.of(page, size);

    return materialRepository.searchMaterials(
            keyword, field, pageable
    );
}

    public Material saveMaterial(Material material) {
        return materialRepository.save(material);
    }

    // EDIT MATERIAL
    public Material updateMaterial(Long id, Material updatedMaterial) {

        Material existingMaterial = materialRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Material not found"));

        existingMaterial.setTitle(updatedMaterial.getTitle());
        existingMaterial.setAuthor(updatedMaterial.getAuthor());
        existingMaterial.setPublisher(updatedMaterial.getPublisher());
        existingMaterial.setPublicationYear(updatedMaterial.getPublicationYear());
        existingMaterial.setIsbn(updatedMaterial.getIsbn());
        existingMaterial.setDescription(updatedMaterial.getDescription());
        existingMaterial.setPages(updatedMaterial.getPages());
        existingMaterial.setCategory(updatedMaterial.getCategory());
        existingMaterial.setGenre(updatedMaterial.getGenre());

        if (updatedMaterial.getDepartment() == null) {
            existingMaterial.setDepartment(null);
        } else {
            Long departmentId = updatedMaterial.getDepartment().getId();

            existingMaterial.setDepartment(
                    departmentRepository.findById(departmentId)
                            .orElseThrow(() -> new ResponseStatusException(
                                    HttpStatus.NOT_FOUND, "Department not found"))
            );
        }

        if (updatedMaterial.getMaterialType() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Material type is required");
        }

        Long materialTypeId = updatedMaterial.getMaterialType().getId();

        existingMaterial.setMaterialType(
                materialTypeRepository.findById(materialTypeId)
                        .orElseThrow(() -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "Material type not found"))
        );

        return materialRepository.save(existingMaterial);
    }

    // DELETE MATERIAL
    public void deleteMaterial(Long id) {

        if (!materialRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Material not found");
        }

        if (materialCopyRepository.existsByMaterial_Id(id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Cannot delete this material because it has registered copies.");
        }

        materialRepository.deleteById(id);
    }
}
