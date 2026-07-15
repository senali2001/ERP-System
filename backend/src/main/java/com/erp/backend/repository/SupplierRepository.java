package com.erp.backend.repository;

import com.erp.backend.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    List<Supplier> findAllByOrderByCompanyNameAsc();
    Optional<Supplier> findBySupplierCode(String code);
    boolean existsBySupplierCode(String code);
}
