package com.example.libraryapp.controller;

import com.example.libraryapp.model.Faculty;
import com.example.libraryapp.service.FacultyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculties")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class FacultyController {

    private final FacultyService facultyService;

    public FacultyController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    @GetMapping
    public List<Faculty> getAllFaculties() {
        return facultyService.getAllFaculties();
    }

    @PostMapping
    public Faculty saveFaculty(@RequestBody Faculty faculty) {
        return facultyService.saveFaculty(faculty);
    }
}