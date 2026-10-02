package com.verabeauty.backend.repository;

import com.verabeauty.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByHairType(String hairType);

    List<Product> findByHairConcern(String hairConcern);

    List<Product> findByBrandIgnoreCase(String brand);

    List<Product> findByNameContainingIgnoreCase(String keyword);

    // Advanced Filter: Find products by hair type, concern, and maximum price
    @Query("SELECT p FROM Product p WHERE " +
           "(:hairType IS NULL OR p.hairType = :hairType) AND " +
           "(:hairConcern IS NULL OR p.hairConcern = :hairConcern) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice)")
    List<Product> filterProducts(
            @Param("hairType") String hairType,
            @Param("hairConcern") String hairConcern,
            @Param("maxPrice") Double maxPrice
    );
}