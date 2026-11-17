
package com.example.libraryapp.service;

import com.example.libraryapp.model.Borrower;
import com.example.libraryapp.model.MaterialCopy;
import com.example.libraryapp.model.BorrowingRecord;
import com.example.libraryapp.repository.BorrowerRepository;
import com.example.libraryapp.repository.MaterialCopyRepository;
import com.example.libraryapp.repository.BorrowingRecordRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class BorrowingRecordService {

    private final BorrowingRecordRepository borrowingRecordRepository;
    private final BorrowerRepository borrowerRepository;
    private final MaterialCopyRepository materialCopyRepository;

    public BorrowingRecordService(
            BorrowingRecordRepository borrowingRecordRepository,
            BorrowerRepository borrowerRepository,
            MaterialCopyRepository materialCopyRepository) {
        this.borrowingRecordRepository = borrowingRecordRepository;
        this.borrowerRepository = borrowerRepository;
        this.materialCopyRepository = materialCopyRepository;
    }

    public List<BorrowingRecord> getAllBorrowingRecords() {
        return borrowingRecordRepository.findAll();
    }

    @Transactional
    public BorrowingRecord borrowMaterial(
            Long borrowerId,
            Long copyId,
            LocalDate borrowDate,
            LocalDate dueDate) {

        Borrower borrower = borrowerRepository.findById(borrowerId)
                .orElseThrow(() -> new IllegalArgumentException("Borrower not found"));

        MaterialCopy copy = materialCopyRepository.findById(copyId)
                .orElseThrow(() -> new IllegalArgumentException("Material copy not found"));

        if (!"AVAILABLE".equals(copy.getStatus())) {
            throw new IllegalArgumentException("This copy is not available");
        }

        if (dueDate.isBefore(borrowDate)) {
            throw new IllegalArgumentException("Due date cannot be before borrow date");
        }

        BorrowingRecord record = new BorrowingRecord();
        record.setBorrower(borrower);
        record.setCopy(copy);
        record.setBorrowDate(borrowDate);
        record.setDueDate(dueDate);
        record.setStatus("BORROWED");

        copy.setStatus("BORROWED");
        materialCopyRepository.save(copy);

        return borrowingRecordRepository.save(record);
    }

    @Transactional
    public BorrowingRecord returnMaterial(Long recordId) {

        BorrowingRecord record = borrowingRecordRepository.findById(recordId)
                .orElseThrow(() -> new IllegalArgumentException("Borrowing record not found"));

        if (!"BORROWED".equals(record.getStatus())) {
            throw new IllegalArgumentException("This material has already been returned");
        }

        record.setReturnDate(LocalDate.now());
        record.setStatus("RETURNED");

        MaterialCopy copy = record.getCopy();
        copy.setStatus("AVAILABLE");

        materialCopyRepository.save(copy);

        return borrowingRecordRepository.save(record);
    }
}
