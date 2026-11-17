
package com.example.libraryapp.service;

import com.example.libraryapp.model.MaterialCopy;
import com.example.libraryapp.repository.MaterialCopyRepository;
import com.example.libraryapp.repository.BorrowingRecordRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialCopyService {

    private final MaterialCopyRepository materialCopyRepository;
    private final BorrowingRecordRepository borrowingRecordRepository;

    public MaterialCopyService(
            MaterialCopyRepository materialCopyRepository,
            BorrowingRecordRepository borrowingRecordRepository) {
        this.materialCopyRepository = materialCopyRepository;
        this.borrowingRecordRepository = borrowingRecordRepository;
    }

    public List<MaterialCopy> getAllCopies() {
        return materialCopyRepository.findAll();
    }

    public MaterialCopy saveCopy(MaterialCopy copy) {
        return materialCopyRepository.save(copy);
    }

    public MaterialCopy updateCopy(Long id, MaterialCopy updatedCopy) {
        MaterialCopy existingCopy = materialCopyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material copy not found"));

        existingCopy.setAccessionNumber(updatedCopy.getAccessionNumber());

        return materialCopyRepository.save(existingCopy);
    }

    public void deleteCopy(Long id) {
        MaterialCopy copy = materialCopyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material copy not found"));

        if ("BORROWED".equalsIgnoreCase(copy.getStatus())) {
            throw new RuntimeException("Cannot delete a borrowed copy.");
        }

        if (borrowingRecordRepository.existsByCopy_Id(id)) {
            throw new RuntimeException("Cannot delete a copy with borrowing history.");
        }

        materialCopyRepository.delete(copy);
    }
}
