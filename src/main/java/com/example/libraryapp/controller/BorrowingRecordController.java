
package com.example.libraryapp.controller;

import com.example.libraryapp.model.BorrowingRecord;
import com.example.libraryapp.service.BorrowingRecordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/borrowing-records")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "https://faculty-library-management-system.vercel.app"})
public class BorrowingRecordController {

    private final BorrowingRecordService borrowingRecordService;

    public BorrowingRecordController(BorrowingRecordService borrowingRecordService) {
        this.borrowingRecordService = borrowingRecordService;
    }

    @GetMapping
    public List<BorrowingRecord> getAllBorrowingRecords() {
        return borrowingRecordService.getAllBorrowingRecords();
    }

    @PostMapping
    public ResponseEntity<?> borrowMaterial(
            @RequestParam Long borrowerId,
            @RequestParam Long copyId,
            @RequestParam LocalDate borrowDate,
            @RequestParam LocalDate dueDate) {

        try {
            BorrowingRecord record = borrowingRecordService.borrowMaterial(
                    borrowerId, copyId, borrowDate, dueDate);

            return ResponseEntity.ok(record);

        } catch (IllegalArgumentException error) {
            return ResponseEntity.badRequest().body(error.getMessage());
        }
    }

    @PutMapping("/{id}/return")
    public ResponseEntity<?> returnMaterial(@PathVariable Long id) {

        try {
            BorrowingRecord record = borrowingRecordService.returnMaterial(id);

            return ResponseEntity.ok(record);

        } catch (IllegalArgumentException error) {
            return ResponseEntity.badRequest().body(error.getMessage());
        }
    }
}
