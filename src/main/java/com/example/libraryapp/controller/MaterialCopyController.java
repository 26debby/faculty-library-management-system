
package com.example.libraryapp.controller;

import com.example.libraryapp.model.MaterialCopy;
import com.example.libraryapp.service.MaterialCopyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/material-copies")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class MaterialCopyController {

    private final MaterialCopyService materialCopyService;

    public MaterialCopyController(MaterialCopyService materialCopyService) {
        this.materialCopyService = materialCopyService;
    }

    @GetMapping
    public List<MaterialCopy> getAllCopies() {
        return materialCopyService.getAllCopies();
    }

    @PostMapping
    public MaterialCopy saveCopy(@RequestBody MaterialCopy copy) {
        return materialCopyService.saveCopy(copy);
    }

    @PutMapping("/{id}")
    public MaterialCopy updateCopy(
            @PathVariable Long id,
            @RequestBody MaterialCopy copy) {
        return materialCopyService.updateCopy(id, copy);
    }

    @DeleteMapping("/{id}")
    public void deleteCopy(@PathVariable Long id) {
        materialCopyService.deleteCopy(id);
    }
}
