package com.erp.backend.repository;

import com.erp.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository 
extends JpaRepository<Product, Long> {

    List<Product> findByProductNameContainingIgnoreCase(String keyword);
}