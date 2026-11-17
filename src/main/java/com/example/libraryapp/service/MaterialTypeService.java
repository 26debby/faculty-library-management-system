package com.example.libraryapp.service;

import com.example.libraryapp.model.MaterialType;
import com.example.libraryapp.repository.MaterialTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialTypeService {

    private final MaterialTypeRepository materialTypeRepository;

    public MaterialTypeService(MaterialTypeRepository materialTypeRepository) {
        this.materialTypeRepository = materialTypeRepository;
    }

    public List<MaterialType> getAllMaterialTypes() {
        return materialTypeRepository.findAll();
    }

    public MaterialType saveMaterialType(MaterialType materialType) {
        return materialTypeRepository.save(materialType);
    }
}