package com.verabeauty.backend.service;

import com.verabeauty.backend.entity.Product;
import com.verabeauty.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getProductsByHairType(String hairType) {
        return productRepository.findByHairType(hairType);
    }

    public List<Product> getProductsByHairConcern(String hairConcern) {
        return productRepository.findByHairConcern(hairConcern);
    }

    public List<Product> filterProducts(String hairType, String hairConcern, Double maxPrice) {
        return productRepository.filterProducts(hairType, hairConcern, maxPrice);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // Helper method handling Long hairScore safely
    public Long getSafeHairScore(Product product) {
        return (product != null && product.getHairScore() != null) ? product.getHairScore() : 0L;
    }
}