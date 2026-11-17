package com.example.libraryapp.service;

import com.example.libraryapp.model.Borrower;
import com.example.libraryapp.repository.BorrowerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BorrowerService {

    private final BorrowerRepository borrowerRepository;

    public BorrowerService(BorrowerRepository borrowerRepository) {
        this.borrowerRepository = borrowerRepository;
    }

    public List<Borrower> getAllBorrowers() {
        return borrowerRepository.findAll();
    }

    public Borrower saveBorrower(Borrower borrower) {
        return borrowerRepository.save(borrower);
    }
}