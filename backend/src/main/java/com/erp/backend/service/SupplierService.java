package com.erp.backend.service;

import com.erp.backend.model.Supplier;
import com.erp.backend.repository.SupplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {

    private final SupplierRepository supplierRepository;

    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAllByOrderByCompanyNameAsc();
    }

    public Supplier getById(Long id) {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found: " + id));
    }

    public Supplier create(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    public Supplier update(Long id, Supplier updated) {
        Supplier existing = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found: " + id));
        existing.setCompanyName(updated.getCompanyName());
        existing.setContactPerson(updated.getContactPerson());
        existing.setPhone(updated.getPhone());
        existing.setEmail(updated.getEmail());
        existing.setAddress(updated.getAddress());
        existing.setPaymentTerms(updated.getPaymentTerms());
        existing.setCategory(updated.getCategory());
        existing.setStatus(updated.getStatus());
        return supplierRepository.save(existing);
    }

    public void delete(Long id) {
        supplierRepository.deleteById(id);
    }
}
