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
        return productRepository.findByProductNameContainingIgnoreCase(keyword);
    }

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updated) {
        Product existing = getProductById(id);
        existing.setProductName(updated.getProductName());
        existing.setCategory(updated.getCategory());
        existing.setUnitType(updated.getUnitType());
        existing.setStockQuantity(updated.getStockQuantity());
        existing.setMinimumStockLevel(updated.getMinimumStockLevel());
        existing.setBuyingPrice(updated.getBuyingPrice());
        existing.setSellingPrice(updated.getSellingPrice());
        existing.setDiscountPercentage(updated.getDiscountPercentage());
        existing.setManufacturingDate(updated.getManufacturingDate());
        existing.setExpiryDate(updated.getExpiryDate());
        existing.setSupplierId(updated.getSupplierId());
        existing.setSupplierName(updated.getSupplierName());
        existing.setBarcode(updated.getBarcode());
        existing.setBrand(updated.getBrand());
        existing.setBatchNumber(updated.getBatchNumber());
        return productRepository.save(existing);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
