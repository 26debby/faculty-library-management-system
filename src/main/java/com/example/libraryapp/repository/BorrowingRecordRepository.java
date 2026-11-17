
package com.example.libraryapp.repository;

import com.example.libraryapp.model.BorrowingRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BorrowingRecordRepository extends JpaRepository<BorrowingRecord, Long> {

    boolean existsByCopy_Id(Long copyId);
}
