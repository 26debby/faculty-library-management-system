package com.example.libraryapp.controller;

import com.example.libraryapp.model.MaterialType;
import com.example.libraryapp.service.MaterialTypeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/material-types")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "https://faculty-library-management-system-8.vercel.app"})
public class MaterialTypeController {

    private final MaterialTypeService materialTypeService;

    public MaterialTypeController(MaterialTypeService materialTypeService) {
        this.materialTypeService = materialTypeService;
    }

    @GetMapping
    public List<MaterialType> getAllMaterialTypes() {
        return materialTypeService.getAllMaterialTypes();
    }

    @PostMapping
    public MaterialType saveMaterialType(@RequestBody MaterialType materialType) {
        return materialTypeService.saveMaterialType(materialType);
    }
}