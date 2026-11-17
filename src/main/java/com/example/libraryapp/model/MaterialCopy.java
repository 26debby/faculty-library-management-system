package com.example.libraryapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "material_copies")
public class MaterialCopy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "material_id", nullable = false)
    private Material material;

    @Column(name = "accession_number", nullable = false, unique = true)
    private String accessionNumber;

    @Column(nullable = false)
    private String status = "AVAILABLE";

    public MaterialCopy() {
    }

    public Long getId() {
        return id;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public String getAccessionNumber() {
        return accessionNumber;
    }

    public void setAccessionNumber(String accessionNumber) {
        this.accessionNumber = accessionNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}