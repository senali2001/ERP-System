package com.erp.backend.Controller;

import com.erp.backend.model.Product;
import com.erp.backend.service.ProductService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")

@CrossOrigin(origins = "http://localhost:3000")

public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/search")
    public List<Product> searchProducts(
            @RequestParam String keyword){

        return productService.searchProducts(keyword);
    }
}