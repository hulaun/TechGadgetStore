package com.example.demo.service;

import com.example.demo.models.Brand;
import com.example.demo.models.Category;
import com.example.demo.models.Product;
import com.example.demo.repositories.BrandRepo;
import com.example.demo.repositories.CategoryRepo;
import com.example.demo.repositories.ProductRepo;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class FakeDataService {

    private final Faker faker = new Faker();
    private final Random random = new Random();

    @Autowired
    private BrandRepo brandRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private ProductRepo productRepo;

    public List<Brand> generateBrands(int count) {
        List<Brand> brands = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            Brand brand = new Brand();
            brand.setName(faker.company().name());
            brand.setDescription(faker.lorem().sentence());
            brands.add(brandRepo.save(brand));
        }
        return brands;
    }

    public List<Category> generateCategories(int count) {
        List<Category> categories = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            Category category = new Category();
            category.setName(faker.commerce().department());
            category.setDescription(faker.lorem().sentence());
            categories.add(categoryRepo.save(category));
        }
        return categories;
    }

    public List<Product> generateProducts(int count) {
        List<Brand> brands = brandRepo.findAll();
        List<Category> categories = categoryRepo.findAll();

        if (brands.isEmpty() || categories.isEmpty()) {
            throw new IllegalStateException("Brands and Categories must be generated first!");
        }

        List<Product> products = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            Product product = new Product();
            product.setName(faker.commerce().productName());
            product.setDescription(faker.lorem().sentence());
            product.setPrice(Double.parseDouble(faker.commerce().price()));
            product.setStockQuantity(random.nextInt(100));
            product.setBrand(brands.get(random.nextInt(brands.size())));
            product.setCategory(categories.get(random.nextInt(categories.size())));
            products.add(productRepo.save(product));
        }
        return products;
    }

    public Page<Brand> getBrands(Pageable pageable) {
        return brandRepo.findAll(pageable);
    }

    public Page<Category> getCategories(Pageable pageable) {
        return categoryRepo.findAll(pageable);
    }

    public Page<Product> getProducts(Pageable pageable) {
        return productRepo.findAll(pageable);
    }

    public Page<Product> getProductsByBrand(Long brandId, Pageable pageable) {
        return productRepo.findAllByBrandId(brandId, pageable);
    }

    public Page<Product> getProductsByCategory(Long categoryId, Pageable pageable) {
        return productRepo.findAllByCategoryId(categoryId, pageable);
    }
}
