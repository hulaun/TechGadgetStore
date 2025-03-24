package com.example.demo.repositories;

import com.example.demo.models.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    Page<Product> findAllByBrandId(Long brandId, Pageable pageable);
    Page<Product> findAllByCategoryId(Long categoryId, Pageable pageable);
}
