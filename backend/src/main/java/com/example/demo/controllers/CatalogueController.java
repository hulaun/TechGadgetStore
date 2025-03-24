package com.example.demo.controllers;

import com.example.demo.models.Brand;
import com.example.demo.models.Category;
import com.example.demo.models.Product;
import com.example.demo.service.FakeDataService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/catalogue")
public class CatalogueController {
    private final FakeDataService fakeDataService;

    public CatalogueController(FakeDataService fakeDataService) {
        this.fakeDataService = fakeDataService;
    }

    @GetMapping("/brands")
    public ResponseEntity<Page<Brand>> getBrands(Pageable pageable) {
        return ResponseEntity.ok(fakeDataService.getBrands(pageable));
    }

    @GetMapping("/brands/{brandId}/products")
    public ResponseEntity<Page<Product>> getProductsByBrand(@PathVariable Long brandId, Pageable pageable) {
        return ResponseEntity.ok(fakeDataService.getProductsByBrand(brandId, pageable));
    }

    @GetMapping("/categories")
    public ResponseEntity<Page<Category>> getCategories(Pageable pageable) {
        return ResponseEntity.ok(fakeDataService.getCategories(pageable));
    }

    @GetMapping("/categories/{categoryId}/products")
    public ResponseEntity<Page<Product>> getProductsByCategory(@PathVariable Long categoryId, Pageable pageable) {
        return ResponseEntity.ok(fakeDataService.getProductsByCategory(categoryId, pageable));
    }

    @GetMapping("/products")
    public ResponseEntity<Page<Product>> getProducts(Pageable pageable) {
        return ResponseEntity.ok(fakeDataService.getProducts(pageable));
    }
}
