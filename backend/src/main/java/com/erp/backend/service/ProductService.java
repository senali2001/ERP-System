package com.erp.backend.service;

import com.erp.backend.model.Product;
import com.erp.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    public List<Product> searchProducts(String keyword){
        return productRepository
                .findByProductNameContainingIgnoreCase(keyword);
    }

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }
}