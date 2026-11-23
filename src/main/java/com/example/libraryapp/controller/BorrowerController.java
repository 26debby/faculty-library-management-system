package com.example.libraryapp.controller;

import com.example.libraryapp.model.Borrower;
import com.example.libraryapp.service.BorrowerService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/borrowers")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "https://faculty-library-management-system-8.vercel.app"})
public class BorrowerController {

    private final BorrowerService borrowerService;

    public BorrowerController(BorrowerService borrowerService) {
        this.borrowerService = borrowerService;
    }

    @GetMapping
    public List<Borrower> getAllBorrowers() {
        return borrowerService.getAllBorrowers();
    }

    @PostMapping
    public Borrower saveBorrower(@RequestBody Borrower borrower) {
        return borrowerService.saveBorrower(borrower);
    }
}