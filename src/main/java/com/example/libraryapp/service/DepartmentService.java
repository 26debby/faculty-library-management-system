
package com.example.libraryapp.service;

import com.example.libraryapp.model.Department;
import com.example.libraryapp.repository.DepartmentRepository;
import com.example.libraryapp.repository.MaterialRepository;
import com.example.libraryapp.repository.BorrowerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final MaterialRepository materialRepository;
    private final BorrowerRepository borrowerRepository;

    public DepartmentService(
            DepartmentRepository departmentRepository,
            MaterialRepository materialRepository,
            BorrowerRepository borrowerRepository) {
        this.departmentRepository = departmentRepository;
        this.materialRepository = materialRepository;
        this.borrowerRepository = borrowerRepository;
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department saveDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public void deleteDepartment(Long id) {
        if (materialRepository.existsByDepartment_Id(id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Department has library materials assigned to it."
            );
        }

        if (borrowerRepository.existsByDepartment_Id(id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Department has borrowers assigned to it."
            );
        }

        departmentRepository.deleteById(id);
    }
}
