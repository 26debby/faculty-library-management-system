
package com.example.libraryapp.controller;

import com.example.libraryapp.model.Material;
import com.example.libraryapp.service.MaterialService;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materials")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "https://faculty-library-management-system-8.vercel.app"})
public class MaterialController {

    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    @GetMapping
    public Page<Material> getAllMaterials(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return materialService.getAllMaterials(page, size);
    }

    @GetMapping("/search")
    public Page<Material> searchMaterials(
            @RequestParam String keyword,
            @RequestParam String field,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return materialService.searchMaterials(
                keyword, field, page, size
        );
    }

    @PostMapping
    public Material saveMaterial(@RequestBody Material material) {
        return materialService.saveMaterial(material);
    }

    // EDIT MATERIAL
    @PutMapping("/{id}")
    public Material updateMaterial(
            @PathVariable Long id,
            @RequestBody Material material) {
        return materialService.updateMaterial(id, material);
    }

    // DELETE MATERIAL
    @DeleteMapping("/{id}")
    public void deleteMaterial(@PathVariable Long id) {
        materialService.deleteMaterial(id);
    }
}
