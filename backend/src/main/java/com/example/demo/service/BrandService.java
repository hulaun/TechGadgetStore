package com.example.demo.service;

import com.example.demo.models.Brand;
import com.example.demo.repositories.BrandRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandService {
    private final BrandRepo brandRepo;

    public BrandService(BrandRepo brandRepo) {
        this.brandRepo = brandRepo;
    }

    public List<Brand> getAllBrands() {
        return brandRepo.findAll();
    }

    public Optional<Brand> getBrandById(Long id) {
        return brandRepo.findById(id);
    }

    public Brand saveBrand(Brand orderItem) {
        return brandRepo.save(orderItem);
    }

    public void deleteBrand(Long id) {
        brandRepo.deleteById(id);
    }
}
